import { credentials } from "../../config/pubnubconfig";
import * as Pubnub from "pubnub";
import { CHANNELS } from "./peertopeer";

export class PubSubNub {
  subscriber: any;
  publisher: any;
  pubnub: any;

  constructor() {
    this.pubnub = new Pubnub(credentials);
  }

  async subscribe(): Promise<void> {
    this.pubnub.subscribe({ channels: Object.values(CHANNELS) });
  }

  async listen(): Promise<void> {
    this.pubnub.addListener({
      message: (messageObject: { channel: string; message: string }) => {
        const { channel, message } = messageObject;

        console.log(
          `Message received. Channel: ${channel}. Message: ${message}.`
        );
      },
    });
  }

  async publish(channel: string, message: string): Promise<void> {
    this.pubnub.publish({ channel, message });
  }
}
