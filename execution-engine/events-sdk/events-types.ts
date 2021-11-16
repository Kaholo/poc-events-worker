interface ExecutePipelineData {
  pipelineId: string;
  trigger: {
    name: string;
    payload: any;
  }
}

interface CreateExecutionQueues {
  executionId: string;
}

export enum EventType {
  InitExecutePipeline="InitExecutePipeline",
  ExecutePipeline="ExecutePipeline",
  ExecuteAction="ExecuteAction",
  StopExecution="StopExecution",
  GetExecutionData="GetExecutionData",
  SetExecutionData="SetExecutionData",
  CreateExecutionQueues="CreateExecutionQueues",
  DestroyExecutionQueues="DestroyExecutionQueues",
}

export interface EventData {
  [EventType.InitExecutePipeline]: any;
  [EventType.ExecutePipeline]: ExecutePipelineData;
  [EventType.ExecuteAction]: any;
  [EventType.StopExecution]: any;
  [EventType.GetExecutionData]: any;
  [EventType.SetExecutionData]: any;
  [EventType.CreateExecutionQueues]: CreateExecutionQueues;
  [EventType.DestroyExecutionQueues]: any;
}


