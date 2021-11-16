import {v4 as uuidv4} from "uuid";

import eventsWorker from "../events-worker"
import {EventType} from "../events-sdk/events-types"


class PipelineExecutionService {
  public async init() {
    await eventsWorker.consume(EventType.ExecutePipeline, async (data) => {
      const executionId = uuidv4();
      await eventsWorker.publish(EventType.CreateExecutionQueues, {executionId})
      await eventsWorker.publish(EventType.SetExecutionData, {})
    });
  }
}

export default new PipelineExecutionService();
