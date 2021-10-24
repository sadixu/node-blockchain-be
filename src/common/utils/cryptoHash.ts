import * as crypto from "sha.js";

export function hash(value: string): string {
  return new crypto.sha256(value).digest("hex");
}
