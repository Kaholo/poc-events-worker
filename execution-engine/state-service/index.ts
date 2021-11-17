const DB: {[key: string]: any} = {
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

  public async getPendingExecutions() {
    return DB.pendingExecutions
  }

  public async setPendingExecutions(data: any) {
    return DB.pendingExecutions = data;
  }

  public async getExecution(id: string): Promise<any> {
    return DB.executions[id];
  }

  public async setExecution(id: string, data: any) {
    return DB.executions[id] = data;
  }
}

export default new StateService();
