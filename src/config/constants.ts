import { GenesisBlockInterface } from "../common/types/GenesisBlock";

export let INITIAL_DIFFICULTY = 1;

export const GENESIS_DATA: GenesisBlockInterface = {
  lastHash: "0",
  hash: "HASH_ZERO",
  data: '',
  nonce: 0,
  difficulty: INITIAL_DIFFICULTY,
};
