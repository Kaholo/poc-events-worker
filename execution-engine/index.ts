import queuesService from "./queues-service"
import stateService from "./state-service"
import pipelineExecutionService from "./pipeline-execution-service"
import actionExecutionService from "./action-execution-service"

import {eventsWorker, EventType} from "./events-worker";


(async () => {
  await queuesService.init();
  await stateService.init();
  await pipelineExecutionService.init();
  await actionExecutionService.init(eventsWorker, stateService);

  await eventsWorker.publish(EventType.InitExecutePipeline, {pipelineId: "pipeline1"});
})();
