import { Block } from "./Block";

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
});
