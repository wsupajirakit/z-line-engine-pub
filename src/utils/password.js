"use strict";

const crypto = require("crypto");

const hashPassword = async (plainText) =>
  crypto.createHash("sha256").update(String(plainText)).digest("hex");

const comparePassword = async (plainText, hash) => {
  const nextHash = await hashPassword(plainText);
  return nextHash === hash;
};

module.exports = { hashPassword, comparePassword };
