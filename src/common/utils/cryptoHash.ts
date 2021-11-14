import sha256 = require("crypto-js/sha256");
import hmacSHA512 = require("crypto-js/hmac-sha512");
import Base64 = require("crypto-js/enc-base64");
import * as hexToBinary from "hex-to-binary";
import * as hex from "string-hex";

export function hash(...values: any[]): string {
  const hashDigest = sha256(values.join(" "));
  const hmacDigest = Base64.stringify(hmacSHA512(hashDigest, "421421"));
  const hmacHexed = hex(hmacDigest);
  const binaryHex = hexToBinary(hmacHexed);

  return binaryHex;
}
