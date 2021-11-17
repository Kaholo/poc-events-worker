interface InitExecutePipelineData {
  pipelineId: string;
  trigger?: {
    name: string;
    payload: any;
  }
}

interface ExecutePipelineData {
  executionId: string;
}

interface ExecuteActionData {
  executionId: string;
  actionId: string;
}

interface CreateExecutionQueuesData {
  executionId: string;
}

export enum EventType {
  // Publisher: Outside of Execution Engine
  // Consumer: PipelineExecutionService
  // Description: Initialization of the execution of particular pipeline. This event may not trigger the actual execution
  // but only schedule it, for example when max concurrent executions is already reached.
  InitExecutePipeline="InitExecutePipeline",

  // Publisher: PipelineExecutionService
  // Consumer: PipelineExecutionService
  // Description: Start the execution of the pipeline
  ExecutePipeline="ExecutePipeline",

  // Publisher: PipelineExecutionService
  // Consumer: ActionExecutionService
  // Description: Start the execution of single action
  ExecuteAction="ExecuteAction",

  FinishPipelineExecution="FinishPipelineExecution",

  FinishActionExecution="FinishActionExecution",

  GetExecutionData="GetExecutionData",

  SetExecutionData="SetExecutionData",

  CreateExecutionQueues="CreateExecutionQueues",

  DestroyExecutionQueues="DestroyExecutionQueues",
}

export interface EventData {
  [EventType.InitExecutePipeline]: InitExecutePipelineData;
  [EventType.ExecutePipeline]: ExecutePipelineData;
  [EventType.ExecuteAction]: ExecuteActionData;
  [EventType.FinishPipelineExecution]: any;
  [EventType.FinishActionExecution]: any;
  [EventType.GetExecutionData]: any;
  [EventType.SetExecutionData]: any;
  [EventType.CreateExecutionQueues]: CreateExecutionQueuesData;
  [EventType.DestroyExecutionQueues]: any;
}


