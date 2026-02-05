"use strict";

const buildNotice = (area, moduleName, action) => ({
  ok: false,
  redacted: true,
  area,
  module: moduleName,
  action,
  message: "This implementation is intentionally omitted in the public repository.",
});

const createControllerStub = (moduleName) =>
  new Proxy(
    {},
    {
      get: (_, action) => (req, res) => {
        if (!res || typeof res.status !== "function") return;
        res.status(501).json(buildNotice("controller", moduleName, String(action)));
      },
    },
  );

const createServiceStub = (moduleName) =>
  new Proxy(
    {},
    {
      get: (_, action) => async () => buildNotice("service", moduleName, String(action)),
    },
  );

const createModelStub = (moduleName) => ({
  name: moduleName,
  redacted: true,
  note: "Schema and data access logic are hidden in this public repo.",
});

module.exports = {
  buildNotice,
  createControllerStub,
  createServiceStub,
  createModelStub,
};
