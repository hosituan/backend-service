
//SHA256 hash
module.exports.getHash = function getHash(string) {
  const crypto = require("crypto");
  const secret = "hosituan";
  const sha256Hasher = crypto.createHmac("sha256", secret);
  const hash = sha256Hasher.update(string).digest("hex");
  return hash;
}
