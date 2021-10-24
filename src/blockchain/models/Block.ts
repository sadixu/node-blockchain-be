import { hash } from "../../common/utils/cryptoHash";

export class Block {
  // Timestamp, no more, no less
  public timestamp: string;

  // Pointer to the previous block
  public lastHash: string;

  // Data within blockchain
  public data: string;

  // Pointer to that specific block
  public hash: string;

  constructor({ lastHash, data }: { lastHash: string; data: string }) {
    this.timestamp = new Date().toISOString();
    this.lastHash = lastHash;
    this.data = data;
    this.hash = hash(data);
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
}
