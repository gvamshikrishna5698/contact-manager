const express = require("express");
const session = require("express-session");
const dotenv = require("./util/env.js");
const contactRoutes = require("./routes/routes");
const bodyParser = require("body-parser");
const config = require("./util/config");
const cookieParser = require("cookie-parser");
var cors = require("cors");

var app = express();
app.use(bodyParser.json());
app.use(config.sessionConfig);
app.use(cookieParser());
app.use(function (req, res, next) {
  res.setHeader("Access-Control-Allow-Origin", "http://localhost:4200");
  res.setHeader("Access-Control-Allow-Credentials", true);
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With"
  );
  res.header("Access-Control-Allow-Methods", "GET, POST, DELETE,PUT");
  next();
});
app.use("/contacts", contactRoutes);
const PORT = dotenv.app_port || 3000;
app.listen(PORT, () => {
  console.log("Express server is running on port: " + PORT + " " + new Date());
});
app.get("/api", function (req, res) {
  if (req.session.page_views) {
    req.session.page_views++;
    res.send("You visited this page " + req.session.page_views + " times");
  } else {
    req.session.page_views = 1;
    res.send("Welcome to this page for the first time!");
  }
});
