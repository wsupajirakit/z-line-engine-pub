"use strict";

const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const helmet = require("helmet");
const apiRoutes = require("./routes/apiRoutes");
const config = require("./config/config");
const connectDB = require("./config/database");

const app = express();

app.set("trust proxy", true);
app.use(helmet());
app.use(cors());
app.use(
  bodyParser.json({
    verify: (req, _res, buf) => {
      req.rawBody = buf.toString();
    },
  }),
);

connectDB();

app.get("/health", (_req, res) => {
  res.status(200).json({ ok: true, mode: "public-structure" });
});

app.use("/", apiRoutes);

if (require.main === module) {
  app.listen(config.port, () => {
    console.log(`[public-structure] server started on port ${config.port}`);
  });
}

module.exports = app;
