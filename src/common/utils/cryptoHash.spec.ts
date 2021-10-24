import { hash } from "./cryptoHash";
import * as crypto from "sha.js";

describe("cryptoHash", () => {
  describe("hash", () => {
    const input = "testInput";

    const output = hash(input);

    it("creates a SHA-256 hashed output", () => {
      expect(output).toEqual(new crypto.sha256(input).digest("hex"));
    });
  });
});
