const { Pool } = require("pg");

const isProduction = process.env.NODE_ENV === "production";

const pool = new Pool(
  isProduction
    ? {
        connectionString: process.env.DATABASE_URL,
        ssl: { rejectUnauthorized: false }
      }
    : {
        host: "localhost",
        user: "postgres",
        password: "Yulay123*",
        database: "modulofamiliar",
        port: 5432
      }
);

module.exports = pool;