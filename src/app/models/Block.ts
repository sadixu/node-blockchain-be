import { hash } from "../../common/utils/cryptoHash";
import { GENESIS_DATA } from "../../config/constants";

export class Block {
  // Timestamp, no more, no less
  public timestamp: string;

  // Pointer to the previous block
  public lastHash: string;

  // Data within blockchain
  public data: string;

  // Pointer to that specific block
  public hash: string;

  constructor({
    lastHash,
    data,
    timestamp,
  }: {
    lastHash: string;
    data: string;
    timestamp?: string;
  }) {
    this.timestamp = timestamp ? timestamp : new Date().toISOString();
    this.lastHash = lastHash;
    this.data = data;
    this.hash = hash(this.timestamp, lastHash, data);
  }

  static mineBlock({
    lastBlock,
    data,
  }: {
    lastBlock: Block;
    data: string;
  }): Block {
    return new this({ lastHash: lastBlock.hash, data });
  }

  static genesis(): Block {
    return new Block({
      lastHash: GENESIS_DATA.lastHash,
      data: GENESIS_DATA.data,
      timestamp: new Date("10.05.2020").toISOString(),
    });
  }
}
