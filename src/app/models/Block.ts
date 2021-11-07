import * as crypto from "../../common/utils/cryptoHash";
import {
  GENESIS_DATA,
  INITIAL_DIFFICULTY,
  MINE_RATE,
} from "../../config/constants";

export class Block {
  timestamp: string;
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
    timestamp?: string;
  }) {
    this.timestamp = timestamp ? timestamp : new Date().toISOString();
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
    const { difficulty } = lastBlock;

    do {
      nonce++;
      timestamp = new Date().toISOString();
      hash = crypto.hash(
        timestamp,
        lastBlock.hash,
        data,
        nonce.toString(),
        difficulty.toString()
      );
    } while (hash.substring(0, difficulty) !== "0".repeat(difficulty));

    return new this({ lastHash: lastBlock.hash, data, difficulty, nonce });
  }

  static genesis(): Block {
    return new Block({
      lastHash: GENESIS_DATA.lastHash,
      data: GENESIS_DATA.data,
      difficulty: GENESIS_DATA.difficulty,
      nonce: GENESIS_DATA.nonce,
      timestamp: new Date("10.05.2020").toISOString(),
    });
  }

  static adjustDifficulty({
    originalBlock,
    timestamp,
  }: {
    originalBlock: Block;
    timestamp: string;
  }): number {
    const { difficulty } = originalBlock;

    const difference =
      new Date(timestamp).valueOf() -
      new Date(originalBlock.timestamp).valueOf();

    if (difference > MINE_RATE) return difficulty - 1;

    return difficulty + 1;
  }
}
