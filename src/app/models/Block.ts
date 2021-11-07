import * as crypto from "../../common/utils/cryptoHash";
import { GENESIS_DATA, INITIAL_DIFFICULTY } from "../../config/constants";

export class Block {
  // Timestamp, no more, no less
  timestamp: string;
  // Pointer to the previous block
  lastHash: string;
  // Data within blockchain
  data: string;
  // Pointer to that specific block
  hash: string;
  nonce: string;
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
    nonce: any;
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
}
