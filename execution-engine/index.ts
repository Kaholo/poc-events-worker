import pipelineExecutionService from "./pipeline-execution-service"
import queuesService from "./queues-service"


(async () => {
  await queuesService.init();
  await pipelineExecutionService.init();
  console.info('DONE');
})();
