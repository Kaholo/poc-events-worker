import queuesService from "./queues-service"
import stateService from "./state-service"
import pipelineExecutionService from "./pipeline-execution-service"


(async () => {
  await queuesService.init();
  await stateService.init();
  await pipelineExecutionService.init();
  console.info('DONE');
})();
