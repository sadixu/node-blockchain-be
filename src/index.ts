import * as express from "express";
import { Blockchain } from "./app/models/Blockchain";
import { json } from "body-parser";
import { PubSub } from "./common/utils/pubsub";
import { logger } from "./common/utils/logger";
import axios from "axios";
import { PORT, ROOT_NODE_ADDRESS, PEER_PORT } from "./config/constants";

const app = express();
app.use(json());

const blockchain = new Blockchain();
const pubsub = new PubSub({ blockchain });
const tempPort = PEER_PORT();

const initializeRedis = async () => {
  await pubsub.connect();
  await pubsub.subscribe();
  await pubsub.broadcastChain();
};

const syncChains = async (blockchain: Blockchain): Promise<void> => {
  try {
    const { data } = await axios.get(`${ROOT_NODE_ADDRESS}/api/blocks`);

    blockchain.replaceChain(data);
  } catch (err) {
    logger.error(err);
  }
};

app.get("/api/blocks", (req, res) => {
  res.status(200).json(blockchain);
});

app.post("/api/mine", async (req, res) => {
  const {
    body: { data },
  } = req;

  blockchain.addBlock({ data });

  await pubsub.broadcastChain();

  res.status(201).send("OK");
});

app.listen(tempPort || PORT, async () => {
  if (tempPort !== PORT) {
    await syncChains(blockchain);
  }

  logger.info(`Blockchain server online on port: ${tempPort || PORT}.`);
  await initializeRedis();
});
