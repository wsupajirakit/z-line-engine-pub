"use strict";

module.exports = {
  processWebhook: async ({ alias, eventCount }) => ({
    ok: true,
    redacted: true,
    alias,
    eventCount,
    note: "Business workflow hidden in public repo.",
  }),
};
