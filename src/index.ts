import { Block } from "./app/models/Block";
import { Blockchain } from "./app/models/Blockchain";

const full = false;

console.info("Initializing Blockchain App");

if (full) {
  console.info("Creating Genesis Block...");
  const genBlock = Block.genesis();
  console.info(genBlock);

  console.info("Mining block with custom data");
  const block = Block.mineBlock({ lastBlock: genBlock, data: "test" });
  console.log(block);
}

console.info("Generating a new chain");
const chain1 = new Blockchain();
console.log(chain1);

console.info("Adding block into the blockchain1");
chain1.addBlock({ data: "hello there" });
console.log(chain1);

console.info(
  "Validating the chain 1 - checking if block contains the proper fields & if the lastHash is correct"
);
console.log(Blockchain.isValidChain(chain1));

const chain2 = new Blockchain();
console.log(chain2);

console.info("Adding block into the blockchain2");
chain2.addBlock({ data: "hello there" });
chain2.addBlock({ data: "general kenobi" });
chain2.addBlock({ data: "ze co robi?" });

console.info(
  "Validating the chain 2 - checking if block contains the proper fields & if the lastHash is correct"
);
console.log(Blockchain.isValidChain(chain2));

console.info("Replacing chain1 with chain2");
chain1.replaceChain(chain2);
console.log(chain1);
