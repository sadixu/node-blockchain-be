import * as express from "express";
import { Blockchain } from "./app/models/Blockchain";
import { json } from "body-parser";
import { PubSub } from "./common/utils/pubsub";
import { logger } from "./common/utils/logger";

// TODO list:
/*
  1. Allow to run multiple apps, thus check if port is taken before running the app, if not, run the app, if yes, search for another port :)
*/
const app = express();
const PORT = 3356;
const blockchain = new Blockchain();

const initializeRedis = async () => {
  const pubsub = new PubSub({ blockchain });
  await pubsub.connect();
  pubsub.broadcastChain();
};

app.use(json());

app.get("/api/blocks", (req, res) => {
  res.status(200).json(blockchain);
});

app.post("/api/mine", (req, res) => {
  const {
    body: { data },
  } = req;

  blockchain.addBlock({ data });

  res.status(201).send("OK");
});

app.listen(PORT, async () => {
  logger.info(`Blockchain server online on port: ${PORT}.`);
  await initializeRedis();
});

const test = false;
const timetest = false;
if (test) {
  console.info("Generating a new chain");
  const chain1 = new Blockchain();
  console.log(chain1);

  console.info("Adding block into the blockchain1");
  chain1.addBlock({ data: "hello there" });
  console.log(chain1);

  console.info(
    "Validating the chain 1 - checking if block contains the proper fields & if the lastHash is correct"
  );
  console.log(Blockchain.isValidChain(chain1));

  console.info("Generating a new chain");
  const chain2 = new Blockchain();
  console.log(chain2);

  console.info("Adding block into the blockchain2");
  chain2.addBlock({ data: "hello there" });
  chain2.addBlock({ data: "general kenobi" });
  chain2.addBlock({ data: "ze co robi?" });

  console.info(
    "Validating the chain 2 - checking if block contains the proper fields & if the lastHash is correct"
  );
  console.log(Blockchain.isValidChain(chain2));

  console.info("Replacing chain1 with chain2");
  chain1.replaceChain(chain2);
  console.log(chain1);
}
if (timetest) {
  let prevTimestamp, nextTimestamp, nextBlock, timeDiff, average;

  const length = 100;
  const blockchain = new Blockchain();
  const times = [];

  blockchain.addBlock({ data: "initial data" });

  for (let i = 0; i < length; i++) {
    prevTimestamp = blockchain.chain[blockchain.chain.length - 1].timestamp;

    blockchain.addBlock({ data: `block ${i}` });

    nextBlock = blockchain.chain[blockchain.chain.length - 1];
    nextTimestamp = nextBlock.timestamp;
    timeDiff = nextTimestamp - prevTimestamp;

    times.push(timeDiff);

    average = times.reduce((total, num) => total + num) / times.length;

    console.log("*********");
    console.log(`Generating block no. ${i + 1}`);
    console.log(`Time to mine a block: ${timeDiff}ms.`);
    console.log(`Difficulty: ${nextBlock.difficulty}.`);
    console.log(`Average time: ${average}ms.`);
  }
}
