const sql = require("mssql");
const dotenv = require("dotenv");
dotenv.config({ path: "./config.env" });
const config = {
  user: process.env.NAME,
  password: process.env.PASSWORD,
  database: process.env.DATABASE,
  server: process.env.SERVER,
};

// Database connection
function dbConnection() {
  // Connecting to Ms Sql database
  return new Promise((resolve, reject) => {
    try {
      sql.connect(config, (err) => {
        if (err) {
          reject("Failed to open a SQL Database connection.", err.stack);
        }
        resolve("SQL connected");
      });
    } catch (err) {
      reject("Failed to connect to a SQL Database connection.", err.message);
    }
  });
}
module.exports = dbConnection;
