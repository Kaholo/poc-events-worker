import actionExecutionService from "./";
import {EventsWorker} from "../events-worker";
import {StateService} from "../state-service";

const getConsumerCallback = async () => {
  let consumerCallback;
  const eventsWorkerMock = {
    consume: (event, callback) => {
      consumerCallback = callback;
    }
  }
  const stateServiceMock = {
    getPipelineByExecutionId: (id) => {
      console.log('ID from getPipelineByExecutionId:', id);
    }
  }
  await actionExecutionService.init(eventsWorkerMock as EventsWorker, stateServiceMock as StateService);
  return consumerCallback;
}

describe("ActionExecutionService", () => {
  describe("ExecuteAction consumer", () => {
    it("should consume ExecuteAction event", async () => {
      const consumerCallback = await getConsumerCallback();
      await consumerCallback({executionId: "not-existing-execution-77"});
    });
  })
});
