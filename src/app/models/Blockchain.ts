import { Block } from "./Block";
import * as crypto from "../../common/utils/cryptoHash";
import { logger } from "../../common/utils/logger";

export class Blockchain {
  chain: Array<Block>;

  constructor() {
    this.chain = [Block.genesis()];
  }

  addBlock({ data }: { data: string }): Array<Block> {
    const newBlock = Block.mineBlock({
      data,
      lastBlock: this.chain[this.chain.length - 1],
    });

    this.chain.push(newBlock);

    return this.chain;
  }

  static isValidChain(blockchain: Blockchain): boolean {
    if (blockchain.chain[0].data !== Block.genesis().data) return false;
    if (
      blockchain.chain[0].hash !==
      Block.genesis(blockchain.chain[0].timestamp).hash
    )
      return false;

    for (let i = 1; i < blockchain.chain.length; i++) {
      const block = blockchain.chain[i];
      const actualLastHash = blockchain.chain[i - 1].hash;
      const { timestamp, lastHash, hash, data, difficulty, nonce } = block;
      const lastDifficulty = blockchain.chain[i - 1].difficulty;

      if (lastHash !== actualLastHash) return false;

      const validatedHash = crypto.hash(
        timestamp,
        lastHash,
        data,
        difficulty,
        nonce
      );

      if (hash !== validatedHash) return false;

      if (Math.abs(lastDifficulty - difficulty) > 1) return false;
    }
    return true;
  }

  replaceChain(blockchain: Blockchain): Blockchain {
    if (
      blockchain.chain.length > 1 &&
      blockchain.chain.length <= this.chain.length
    ) {
      logger.softError("The incoming chain must be longer");
      return;
    }
    if (!Blockchain.isValidChain(blockchain)) {
      logger.softError("The incoming chain must be valid!");
      return;
    }

    this.chain = blockchain.chain;

    return this;
  }
}
