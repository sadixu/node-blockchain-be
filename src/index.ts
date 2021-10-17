// import { runDemo } from "./examples/exampleBlock";
// runDemo();

import { Block } from "./blockchain/models/Block";
import { GenesisBlock } from './blockchain/models/GenesisBlock'

console.log("Initialising Blockchain stuff.");

const genBlock = GenesisBlock.create()

const block1 = new Block({
  lastHash: "one",
  hash: "one",
  data: "data",
});

console.log(block1);
