import eventsWorker from "../events-worker"
import {EventType} from "../events-sdk/events-types"


class QueuesService {
  public async init() {
    // create some constant queues

    await eventsWorker.consume(EventType.CreateExecutionQueues, async (data) => {

    })
  }
}

export default new QueuesService();
