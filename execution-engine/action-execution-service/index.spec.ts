import actionExecutionService from "./";
import {eventsWorker} from "../events-worker";
import stateService from "../state-service";

jest.mock('../events-worker');
jest.mock('../state-service');


const getConsumerCallback = async () => {
  let consumerCallback;
  (eventsWorker.consume as jest.Mock).mockImplementation((event, callback) => {
    consumerCallback = callback;
  });
  await actionExecutionService.init();
  return consumerCallback;
}

describe("ActionExecutionService", () => {
  it("should consume ExecuteAction event", async () => {
    await actionExecutionService.init();
    expect(eventsWorker.consume).toBeCalledTimes(1)
    expect(eventsWorker.consume).toBeCalledWith("ExecuteAction", expect.any(Function));
  });
  describe("ExecuteAction consumer", () => {
    describe("when action has no successors nodes", () => {
      beforeEach(() => {
        (stateService.getPipelineByExecutionId as jest.Mock).mockReturnValue({
          actions: [
            {
              id: 'action1',
              delay: 1
            }
          ]
        })
      });
      it("should not publish any ExecuteAction event", async () => {
        const consumerCallback = await getConsumerCallback();
        await consumerCallback({executionId: "executionId", actionId: "action1"});
        expect(eventsWorker.publish).toHaveBeenCalledTimes(0);
      });
    });
    describe("when action has two successors nodes", () => {
      beforeEach(() => {
        (stateService.getPipelineByExecutionId as jest.Mock).mockReturnValue({
          actions: [
            {
              id: 'action1',
              next: ['action2', 'action3'],
              delay: 1
            }
          ]
        })
      });
      it("should publish two ExecuteAction events with actions ids", async () => {
        const consumerCallback = await getConsumerCallback();
        await consumerCallback({executionId: "executionId", actionId: "action1"});
        expect(eventsWorker.publish).toHaveBeenCalledTimes(2);
        expect(eventsWorker.publish).toHaveBeenCalledWith("ExecuteAction", {
          executionId: "executionId",
          actionId: "action2"
        });
        expect(eventsWorker.publish).toHaveBeenCalledWith("ExecuteAction", {
          executionId: "executionId",
          actionId: "action3"
        });
      });
    });
  });
});
