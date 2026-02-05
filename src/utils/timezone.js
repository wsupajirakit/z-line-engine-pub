"use strict";

const dayjs = require("dayjs");

module.exports = {
  formatInTimezone(dateLike) {
    return dayjs(dateLike).format("YYYY-MM-DD HH:mm:ss");
  },
};
