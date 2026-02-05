"use strict";

module.exports = {
  getVersion: (_req, res) => {
    res.status(200).json({
      project: "z-line-engine",
      visibility: "public-structure",
      version: process.env.APP_VERSION || "public-0.1.0",
    });
  },
};
