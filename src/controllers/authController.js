"use strict";

module.exports = {
  login: (_req, res) => {
    res.status(501).json({ ok: false, redacted: true, flow: "auth.login" });
  },
  logout: (_req, res) => {
    res.status(501).json({ ok: false, redacted: true, flow: "auth.logout" });
  },
  refresh: (_req, res) => {
    res.status(501).json({ ok: false, redacted: true, flow: "auth.refresh" });
  },
};
