import eventsWorker from "../events-worker";
import stateService from "../state-service";
import {EventType} from "../events-sdk/events-types";


class ActionExecutionService {
  public async init() {
    await eventsWorker.consume(EventType.ExecuteAction, async (data) => {
      console.log("execute action", data);
    });
  }
}

export default new ActionExecutionService();
