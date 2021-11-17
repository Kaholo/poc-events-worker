import {v4 as uuidv4} from "uuid";

import eventsWorker from "../events-worker";
import stateService from "../state-service";
import {EventType} from "../events-sdk/events-types";


class PipelineExecutionService {
  public async init() {
    await eventsWorker.consume(EventType.InitExecutePipeline, async (data) => {
      const executionId = uuidv4();
      await stateService.transaction(executionId, async () => {
        const willBeExecutedNow = await stateService.getPendingExecutions() || true;
        if (willBeExecutedNow) {
          await stateService.setExecution(executionId, {state: "init"});
          // below call and possible other not related to execution state should be out of transaction
          await eventsWorker.publish(EventType.ExecutePipeline, {executionId});
        } else if ("Should bes scheduled as pending") {
          await stateService.setExecution(executionId, {state: "pending"});
          await stateService.setPendingExecutions([executionId])
        }
      })
    });

    await eventsWorker.consume(EventType.ExecutePipeline, async (data) => {
      await stateService.setExecution(data.executionId, {state: "running"});
      await eventsWorker.publish(EventType.CreateExecutionQueues, {executionId: data.executionId});
      const startActions = ['findStartActions()'];
      for (const startAction of startActions) {
        await eventsWorker.publish(EventType.ExecuteAction, startAction);
      }
    });
  }
}

export default new PipelineExecutionService();
