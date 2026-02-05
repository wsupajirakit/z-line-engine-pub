"use strict";

const hookService = require("../services/hookService");

module.exports = {
  handleWebhook: async (req, res) => {
    // Preserve high-level flow without exposing internals.
    const summary = await hookService.processWebhook?.({
      alias: req.params.alias || "default",
      eventCount: Array.isArray(req.body?.events) ? req.body.events.length : 0,
    });

    res.status(202).json({
      accepted: true,
      redacted: true,
      summary,
    });
  },
};
