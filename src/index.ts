import * as express from "express";
import { Blockchain } from "./app/models/Blockchain";
import { json } from "body-parser";
import { PubSub } from "./common/utils/pubsub";
import { logger } from "./common/utils/logger";

// TODO list:
/*
  1. Allow to run multiple apps, thus check if port is taken before running the app, if not, run the app, if yes, search for another port :)
  2. or check inside the CLI if param api: true was passed, if yes, run the REST api, if not, run redis without API
*/
const app = express();
const PORT = 3356;
const blockchain = new Blockchain();
const pubsub = new PubSub({ blockchain });

const initializeRedis = async () => {
  await pubsub.connect();
  await pubsub.subscribe();
  await pubsub.broadcastChain();
};

const generatePeerPort = (): number => {
  let peerPort: number = 0;
  if (process.env.GENERATE_PEER_PORT === "true") {
    peerPort = PORT + Math.ceil(Math.random() * 1000);
  }

  return peerPort;
};

app.use(json());

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

app.listen(generatePeerPort() || PORT, async () => {
  console.log(process.env.GENERATE_PEER_PORT);
  logger.info(
    `Blockchain server online on port: ${generatePeerPort() || PORT}.`
  );
  await initializeRedis();
});
