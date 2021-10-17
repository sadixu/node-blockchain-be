/**
 * Class representing a block
 * Block stores info about data, current hash and the last block's hash
 */
class Block {
  public data: any;
  public hash: string;
  public lastHash: string;

  constructor(data, hash: string, lastHash: string) {
    this.data = data;
    this.hash = hash;
    this.lastHash = lastHash;
  }
}

// Basic hash example
const lightningHash = (data: string) => {
  return `${data}*`;
};

/**
 * Class representing a blockchain
 * Creates a chain with the first block so the chain won't be empty
 */
class Blockchain {
  public chain: Array<Block>;

  constructor() {
    // Blockchain needs to start with a Genesis (first) block
    const genesisBlock = new Block("gen-data", "gen-hash", "gen-lastHash");

    this.chain = [genesisBlock];
  }

  addBlock(data: string) {
    // Getting last item of blockchain
    const lastHash = this.chain[this.chain.length - 1].hash;

    // Generating new hash
    const hash = lightningHash(data + lastHash);

    // Creating new block
    const block = new Block(data, hash, lastHash);

    // Adding a block to the chain
    this.chain.push(block);
  }
}

export function runDemo(): void {
  // Creating a blockchain
  const fooBlockchain = new Blockchain()
  
  // Adding some blocks
  
  fooBlockchain.addBlock('one')
  fooBlockchain.addBlock('two')

  console.log(fooBlockchain)
}
