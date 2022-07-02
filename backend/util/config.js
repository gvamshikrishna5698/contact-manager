const dotenv = require("./env.js");
const express = require("express");
const session = require("express-session");
const cors = require("cors");

const corsConfig = cors({
  origin: ["http://localhost:4200"],
  credentials: true,
});

const sessionConfig = session({
  secret: "thisismysecrctekeyfhrgfgrfrty84fwir767",
  saveUninitialized: true,
  cookie: { maxAge: 1660000 },
  resave: false,
});

module.exports = {
  corsConfig,
  sessionConfig,
};
