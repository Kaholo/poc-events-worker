import {v4 as uuidv4} from "uuid";

import eventsWorker from "../events-worker";
import stateService from "../state-service";
import {EventType} from "../events-sdk/events-types";


class PipelineExecutionService {
  public async init() {
    await eventsWorker.consume(EventType.InitExecutePipeline, async (data) => {
      console.info("PipelineExecutionService - InitExecutePipeline");
      const executionId = uuidv4();
      await stateService.transaction(executionId, async () => {
        const willBeExecutedNow = await stateService.getPendingExecutions() || true;
        if (willBeExecutedNow) {
          await stateService.setExecution(executionId, {state: "init", pipeline: data.pipelineId});
          // below call and possible other not related to execution state should be out of transaction
          await eventsWorker.publish(EventType.ExecutePipeline, {executionId});
        } else if ("Should bes scheduled as pending") {
          await stateService.setExecution(executionId, {state: "pending", pipeline: data.pipelineId});
          await stateService.setPendingExecutions([executionId])
        }
      })
    });

    await eventsWorker.consume(EventType.ExecutePipeline, async (data) => {
      console.info("PipelineExecutionService - ExecutePipeline");
      await stateService.setExecution(data.executionId, {state: "running"});
      await eventsWorker.publish(EventType.CreateExecutionQueues, {executionId: data.executionId});
      const pipeline = await stateService.getPipelineByExecutionId(data.executionId);
      const startActions = pipeline.actions.filter((action: any) => action.start);
      for (const startAction of startActions) {
        await eventsWorker.publish(EventType.ExecuteAction, {actionId: startAction.id, executionId: data.executionId});
      }
    });
  }
}

export default new PipelineExecutionService();
