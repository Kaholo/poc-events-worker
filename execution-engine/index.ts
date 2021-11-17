import queuesService from "./queues-service"
import stateService from "./state-service"
import pipelineExecutionService from "./pipeline-execution-service"
import actionExecutionService from "./action-execution-service"

import eventsWorker from "./events-worker"
import {EventType} from "./events-sdk/events-types"


(async () => {
  await queuesService.init();
  await stateService.init();
  await pipelineExecutionService.init();
  await actionExecutionService.init();
  console.info('DONE');

  await eventsWorker.publish(EventType.InitExecutePipeline, {pipelineId: "any-id"})
})();
