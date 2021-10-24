import { GENESIS_DATA } from "../../config/constants";
import { GenesisBlock } from "./GenesisBlock";

describe('GenesisBlock model tests', () => {
  describe('create', () => {
    it('creates a block with generic data', () => {
      const testBlock = GenesisBlock.create()

      expect(testBlock.data).toEqual(GENESIS_DATA.data)
      expect(testBlock.hash).toEqual(GENESIS_DATA.hash)
      expect(testBlock.lastHash).toEqual(GENESIS_DATA.lastHash)
    })
  })
})