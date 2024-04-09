const express = require("express");
const cors = require("cors");
const app = express();
const allowedOrigins = require("./allowedOrigin");

const corsOptions = {
  origin: function (origin, callback) {
    if (allowedOrigins.includes(origin) || !origin) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  credentials: true,
  optionSuccessStatus: 200,
};

module.exports = corsOptions;
