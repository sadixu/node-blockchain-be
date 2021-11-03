import { Block } from "./Block";
import { GENESIS_DATA } from "../../config/constants";

export class GenesisBlock extends Block {
  static create(): Block {
    return new Block({
      lastHash: GENESIS_DATA.lastHash,
      data: GENESIS_DATA.data,
    });
  }
}
