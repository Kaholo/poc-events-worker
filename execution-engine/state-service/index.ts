import eventsWorker from "../events-worker";
import {EventType} from "../events-sdk/events-types"

const DB = {
  agents: {
    keyA: {
      key: "keyA",
      name: "Linux Agent",
    },
    keyB: {
      key: "keyB",
      name: "Windows 95 Agent",
    },
    keyC: {
      key: "keyC",
      name: "Windows XP Super Agent",
    }
  },
  executions: {
    sampleId1: {
      state: "in-progress"
    },
    sampleId2: {
      state: "success"
    }
  }
};

eventsWorker.consume(EventType.GetAgentRequest, (data) => {
  eventsWorker.publish(EventType.GetAgentResponse, DB.agents[data.key]);
});
