import { createClient } from "redis";
import { Block } from "../../app/models/Block";
import { Blockchain } from "../../app/models/Blockchain";
import { CHANNELS } from "../../config/peertopeer";
import { logger } from "./logger";

export class PubSub {
  publisher: any;
  subscriber: any;
  blockchain: Blockchain;

  constructor({ blockchain }: { blockchain: Blockchain }) {
    this.blockchain = blockchain;
    const client = createClient({
      url: "redis://0.0.0.0:6379",
    });

    this.subscriber = client.duplicate();
    this.publisher = client.duplicate();
  }

  async handleMessage(channel: string, message: string) {
    if (channel === CHANNELS.BLOCKCHAIN) {
      logger.log(
        `Message received. Channel: ${channel}. Message contains new blockchain.`
      );

      const parsedMessage = JSON.parse(message);

      this.blockchain.replaceChain(parsedMessage);
    } else {
      logger.log(`Message received. Channel: ${channel}. Message: ${message}`);
    }
  }

  async connect() {
    await this.publisher.connect();
    logger.info("Publisher connected.");
    await this.subscriber.connect();
    logger.info("Subscriber connected.");
  }

  async subscribe() {
    await this.subscriber.pSubscribe(
      CHANNELS.BLOCKCHAIN,
      async (message: string, channel: string) => {
        await this.handleMessage(channel, message);
      }
    );
  }

  async publish(message: string, channel = CHANNELS.BLOCKCHAIN) {
    await this.publisher.publish(channel, message);
    logger.log(`Pushed the message to the ${channel} channel.`);
  }

  async broadcastChain() {
    await this.publish(JSON.stringify(this.blockchain));
  }
}
