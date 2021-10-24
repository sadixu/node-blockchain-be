import { Block } from "./blockchain/models/Block";
import { GenesisBlock } from "./blockchain/models/GenesisBlock";

console.info("Initializing Blockchain App");

console.info("Creating Genesis Block...");
const genBlock = GenesisBlock.create();
console.info(genBlock);

const block = Block.mineBlock({ lastBlock: genBlock, data: "test" });
console.log(block);
