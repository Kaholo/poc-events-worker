import {eventsWorker, EventType} from "../events-worker";
import stateService from "../state-service";


class ActionExecutionService {
  public async init() {
    await eventsWorker.consume(EventType.ExecuteAction, async (data) => {
      const pipeline = await stateService.getPipelineByExecutionId(data.executionId);
      const action = pipeline.actions.find((action: any) => action.id === data.actionId);
      console.info("ActionExecutionService - ExecuteAction", action.id,  `sleep(${action.delay}s)`);
      await new Promise(resolve => setTimeout(resolve, action.delay * 1000));
      const nextActionIds = action.next || [];
      for (const nextActionId of nextActionIds) {
        // Here should be the logic the check for example `wait-for-all` condition. It should be done as a transaction/
        await eventsWorker.publish(EventType.ExecuteAction, {
          executionId: data.executionId,
          actionId: nextActionId
        });
      }
    });
  }
}

export default new ActionExecutionService();
