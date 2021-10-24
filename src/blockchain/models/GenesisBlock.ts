import { Block } from "./Block";
import { GENESIS_DATA } from "../../config/constants";

export class GenesisBlock extends Block {
  static create(): Block {
    return new Block({
      lastHash: GENESIS_DATA.lastHash,
      hash: GENESIS_DATA.hash,
      data: GENESIS_DATA.data,
    });
  }
}
