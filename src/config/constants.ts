import { GenesisBlockInterface } from "../types/GenesisBlock";
import faker = require("faker");

export const INITIAL_DIFFICULTY = 3;
export const MINE_RATE = 3000; // 1000 is 1 second in ms
export const GENESIS_DATA: GenesisBlockInterface = {
  lastHash: "0",
  hash: "HASH_ZERO",
  data: "",
  nonce: 0,
  difficulty: INITIAL_DIFFICULTY,
};
export const API_NAME = `${faker.commerce.productMaterial()} ${faker.name.firstName()}`;
export const PORT = 3356;
export const ROOT_NODE_ADDRESS = `http://localhost:${PORT}`;
export const PEER_PORT = (): number => {
  let port: number = 0;

  if (process.env.GENERATE_PEER_PORT === "true") {
    port = PORT + Math.ceil(Math.random() * 1000);
  }

  return port;
};
