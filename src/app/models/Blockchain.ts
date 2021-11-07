import { Block } from "./Block";
import * as crypto from "../../common/utils/cryptoHash";

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
    if (blockchain.chain[0].hash !== Block.genesis().hash) return false;

    for (let i = 1; i < blockchain.chain.length; i++) {
      const block = blockchain.chain[i];

      const actualLastHash = blockchain.chain[i - 1].hash;

      const { timestamp, lastHash, hash, data } = block;

      if (lastHash !== actualLastHash) return false;

      const validatedHash = crypto.hash(timestamp, lastHash, data);

      if (hash !== validatedHash) return false;
    }
    return true;
  }
}
