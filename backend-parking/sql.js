const mysql = require("mysql");
const config = require("./config");
const fs = require("fs");

const Connection = mysql.createConnection({
  host: config.SQLHOST,
  user: config.SQLUSER,
  password: config.SQLPASS,
  database: config.SQLDB,
  port: config.SQLPORT,
  ssl: {
    rejectUnauthorized: true,
    ca: fs.readFileSync("DigiCertGlobalRootCA.crt.pem", "utf8"),
  },
});

Connection.connect((err) => {
  if (err) {
    console.log("Error Connecting to MySQL database = ", err);
    return;
  }
  console.log("MySQL successfully connected");
});

module.exports = {
  Connection: Connection,
};
