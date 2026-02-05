"use strict";

require("dotenv").config();

module.exports = {
  env: process.env.NODE_ENV || "development",
  port: Number(process.env.PORT || 3000),
  gemini: {
    modelId: process.env.GEMINI_MODEL || "redacted-public-model",
  },
  mongoUri: process.env.MONGO_URI || "mongodb://localhost:27017/redacted",
};
