import { Block } from "./app/models/Block";
import { Blockchain } from "./app/models/Blockchain";

const full = false

console.info("Initializing Blockchain App");

if (full) {
  console.info("Creating Genesis Block...");
  const genBlock = Block.genesis();
  console.info(genBlock);

  console.info('Mining block with custom data')
  const block = Block.mineBlock({ lastBlock: genBlock, data: "test" });
  console.log(block);
}


console.info('Generating a new chain')
const chain = new Blockchain()
console.log(chain)

console.info('Adding block into the blockchain')
chain.addBlock({ data: 'hello there' })
console.log(chain)

console.info('Validating the chain - checking if block contains the proper fields & if the lastHash is correct')
console.log(Blockchain.isValidChain(chain))
