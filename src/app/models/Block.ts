import * as crypto from "../../common/utils/cryptoHash";
import { GENESIS_DATA, MINE_RATE } from "../../config/constants";
import * as hexToBinary from "hex-to-binary";
import * as hex from "string-hex";
import { logger } from "../../common/utils/logger";

export class Block {
  timestamp: number;
  lastHash: string;
  data: string;
  hash: string;
  nonce: number;
  difficulty: number;

  constructor({
    lastHash,
    data,
    timestamp,
    nonce,
    difficulty,
  }: {
    lastHash: string;
    data: string;
    nonce: number;
    difficulty: number;
    timestamp?: number;
  }) {
    this.timestamp = timestamp ? timestamp : new Date().valueOf();
    this.lastHash = lastHash;
    this.data = data;
    this.nonce = nonce;
    this.difficulty = difficulty;
    this.hash = crypto.hash(this.timestamp, lastHash, data, difficulty, nonce);
  }

  static mineBlock({
    lastBlock,
    data,
  }: {
    lastBlock: Block;
    data: string;
  }): Block {
    let hash, timestamp;
    let nonce = 0;
    let { difficulty } = lastBlock;

    do {
      nonce++;
      timestamp = new Date().valueOf();

      difficulty = Block.adjustDifficulty({
        originalBlock: lastBlock,
        timestamp,
      });

      hash = crypto.hash(
        timestamp,
        lastBlock.hash,
        data,
        nonce.toString(),
        difficulty.toString()
      );
    } while (
      hexToBinary(hex(hash)).substring(0, difficulty) !== "0".repeat(difficulty)
    );

    logger.log("Ha! I just mined a new block!");

    return new this({ lastHash: lastBlock.hash, data, difficulty, nonce });
  }

  static genesis(): Block {
    logger.log("Creating genesis block, sounds fun :)!");
    return new Block({
      lastHash: GENESIS_DATA.lastHash,
      data: GENESIS_DATA.data,
      difficulty: GENESIS_DATA.difficulty,
      nonce: GENESIS_DATA.nonce,
      timestamp: new Date().valueOf(),
    });
  }

  static adjustDifficulty({
    originalBlock,
    timestamp,
  }: {
    originalBlock: Block;
    timestamp: number;
  }): number {
    const { difficulty } = originalBlock;
    if (difficulty < 1) return 1;

    const difference = timestamp - originalBlock.timestamp;

    if (difference > MINE_RATE) return difficulty - 1;

    return difficulty + 1;
  }
}
