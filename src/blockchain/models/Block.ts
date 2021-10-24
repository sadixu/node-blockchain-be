export class Block {
  // Timestamp, no more, no less
  public timestamp: string;

  // Pointer to the previous block
  public lastHash: string;

  // Data within blockchain
  public data: any;

  // Pointer to that specific block
  public hash: string;

  constructor({
    lastHash,
    hash,
    data,
  }: {
    lastHash: string;
    hash: string;
    data: any;
  }) {
    this.timestamp = new Date().toISOString();
    this.lastHash = lastHash;
    this.hash = hash;
    this.data = data;
  }

  static mineBlock({
    lastBlock,
    data,
  }: {
    lastBlock: Block;
    data: any;
  }): Block {
    return new Block({ lastHash: lastBlock.hash, data, hash: "112" });
  }
}
