import {eventsWorker, EventType} from "../events-worker";


class QueuesService {
  public async init() {
    // connect to rabbitMQ

    // create some constant queues

    await eventsWorker.consume(EventType.CreateExecutionQueues, async (data) => {
      // create queues for particular execution usage
      console.info("QueuesService - CreateExecutionQueues");
    })
  }
}

export default new QueuesService();
