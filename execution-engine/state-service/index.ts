const DB: any = {
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
  pipelines: {
    pipeline1: {
      name: "Sample pipeline with two parallel actions in the flow",
      actions: [
        {
          id: 'action1',
          start: true,
          next: ['action2', 'action3'],
          delay: 2
        },
        {
          id: 'action2',
          delay: 1
        },
        {
          id: 'action3',
          next: ['action4'],
          delay: 2
        },
        {
          id: 'action4',
          delay: 3
        }
      ]
    }
  },
  executions: {
    sampleId1: {
      state: "in-progress"
    },
    sampleId2: {
      state: "success"
    },
    sampleId3: {
      state: "pending"
    }
  },
  pendingExecutions: ["sampleId3"]
};

class StateService {
  public async init() {
    await Promise.resolve();
  }

  public async transaction(id: string, callback: () => void) {
    // Here there will be mechanism to evaluate callbacks for the same id only once at a time
    // The first known use case for this function is to do operations on execution state on redis per single execution
    // It may be implemented as RabbitMQ single queue per execution per system, Redis transactions or possible other ways
    await callback()
  }

  public async getPipeline(pipelineId: string) {
    return DB.pipelines[pipelineId];
  }

  public async getPipelineByExecutionId(executionId: string) {
    const pipelineId = DB.executions[executionId].pipeline
    return DB.pipelines[pipelineId];
  }

  public async getExecution(id: string) {
    return DB.executions[id];
  }

  public async setExecution(id: string, data: any) {
    const oldData = DB.executions[id] || {};
    DB.executions[id] = {...oldData, ...data};
  }

  public async getPendingExecutions() {
    return DB.pendingExecutions
  }

  public async setPendingExecutions(data: any) {
    DB.pendingExecutions = data;
  }
}

export default new StateService();
