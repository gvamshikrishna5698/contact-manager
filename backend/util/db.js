const mysql = require("mysql2");
const dotenv = require("./env.js");

var dbConnection = mysql.createConnection({
  host: dotenv.db_host,
  user: dotenv.db_user,
  password: dotenv.db_password,
  port: process.env.db_port,
  database: process.env.db_database,
});

dbConnection.connect((err) => {
  if (!err) console.log("DB connection succeeded!");
  else console.log("DB COnnection failed due to following error: \n  " + err.m);
});

module.exports = dbConnection;
