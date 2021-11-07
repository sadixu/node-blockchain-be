import { GenesisBlockInterface } from "../common/types/GenesisBlock";

export const INITIAL_DIFFICULTY = 1;
export const MINE_RATE = 1000; // 1 second in ms
export const GENESIS_DATA: GenesisBlockInterface = {
  lastHash: "0",
  hash: "HASH_ZERO",
  data: "",
  nonce: 0,
  difficulty: INITIAL_DIFFICULTY,
};
