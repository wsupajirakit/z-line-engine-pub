"use strict";

module.exports = {
  sign(payload) {
    return Buffer.from(JSON.stringify(payload), "utf8").toString("base64url");
  },
  verify(token) {
    try {
      return JSON.parse(Buffer.from(token, "base64url").toString("utf8"));
    } catch (_error) {
      return null;
    }
  },
};
