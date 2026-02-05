"use strict";

const config = require("./config");

module.exports = async function connectDB() {
  // Public repo: keep connection behavior as a safe no-op.
  if (config.env !== "test") {
    console.log("[public-structure] database connection is redacted");
  }
};
