"use strict";

const authenticate = (req, _res, next) => {
  req.user = req.user || { id: "public-demo-user", role: "viewer" };
  next();
};

const authorize = (_permission) => (_req, _res, next) => {
  next();
};

module.exports = { authenticate, authorize };
