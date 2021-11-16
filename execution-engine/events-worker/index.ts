import {EventData} from "../events-sdk/events-types"


class EventsWorker {
  public async consume<E extends keyof EventData>(event: E, callback: (data: EventData[E]) => void) {
    console.log(event, callback);
  }

  public async publish<E extends keyof EventData>(event: E, data: EventData[E]) {
    console.log(event, data);
  }
}

export default new EventsWorker();
