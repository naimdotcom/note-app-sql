const mysql = require("mysql2/promise");
const pool = mysql.createPool({
  host: "localhost",
  port: 3306,
  user: "root",
  password: process.env.MYSQL_PASS,
  database: "note_db",
});

module.exports = pool;
