import {EventType, EventData} from "./events"

const queuesMock: any = {}


class EventsWorker {
  public async consume<E extends keyof EventData>(event: E, callback: (data: EventData[E]) => void) {
    queuesMock[event] = callback;
  }

  public async publish<E extends keyof EventData>(event: E, data: EventData[E]) {
    queuesMock[event](data);
  }
}

export const eventsWorker = new EventsWorker();
export {EventType, EventData};
