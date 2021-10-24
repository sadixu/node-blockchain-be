import { Block } from "./Block";
import { GenesisBlock } from "./GenesisBlock";

describe("Block model tests", () => {
  describe("constructor", () => {
    it("creates a new block", () => {
      const block = new Block({
        lastHash: "113",
        hash: "451",
        data: { exampleKey: "exampleValue" },
      });

      expect(block.lastHash).toEqual("113");
      expect(block.hash).toEqual("451");
      expect(block.data).toEqual({ exampleKey: "exampleValue" });
      expect(block.timestamp).not.toBeNull();
    });
  });

  describe("mineBlock", () => {
    const lastBlock = GenesisBlock.create();

    const data = "mined data";
    const mineBlock = Block.mineBlock({ lastBlock, data });

    it("creates new Block", () => {
      expect(mineBlock instanceof Block).toEqual(true);
    });
    it("holds reference to the previous block", () => {
      expect(mineBlock.lastHash).toEqual(lastBlock.hash);
    });
    it("sets the data correctly", () => {
      expect(mineBlock.data).toEqual(data);
    });
    it("sets a timestamp", () => {
      expect(mineBlock.timestamp instanceof Date);
      expect(mineBlock.timestamp).not.toBeNull();
      expect(mineBlock.timestamp).not.toBeUndefined();
    });
  });
});
