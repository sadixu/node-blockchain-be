import { createClient } from "redis";
import { CHANNELS } from "./peertopeer";

export class PubSub {
  publisher: any;
  subscriber: any;

  constructor() {
    const client = createClient({
      url: "redis://0.0.0.0:6379",
    });

    this.subscriber = client.duplicate();
    this.publisher = client.duplicate();
  }

  handleMessage(channel: string, message: string) {
    console.log(`Message received. Channel: ${channel}. Message: ${message}`);
  }

  async connect() {
    await this.publisher.connect();
    console.log("Publisher connected.");
    await this.subscriber.connect();
    console.log("Subscriber connected.");
  }

  async subscribe() {
    await this.subscriber.pSubscribe(
      CHANNELS.TEST,
      (message: string, channel: string) => {
        this.handleMessage(channel, message);
      }
    );
  }

  async publish(message: string) {
    await this.publisher.publish(CHANNELS.TEST, message);
  }
}
