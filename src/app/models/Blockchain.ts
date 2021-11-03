import { Block } from "./Block"
import { GenesisBlock } from "./GenesisBlock"

export class Blockchain {
  chain: Array<Block>

  constructor() {
    this.chain = [GenesisBlock.create()]
  }

  addBlock({ data }: { data: string }): Array<Block> {
    const newBlock = Block.mineBlock({ data, lastBlock: this.chain[this.chain.length - 1] })

    this.chain.push(newBlock)

    return this.chain
  }
}