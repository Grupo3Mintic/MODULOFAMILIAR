// database1.js
const { Pool } = require("pg");

const isProduction = process.env.NODE_ENV === "production";

const pool = new Pool(
  isProduction
    ? {
        connectionString: process.env.DATABASE_URL,
        ssl: {
          rejectUnauthorized: false
        }
      }
    : {
        host: "localhost",
        user: "postgres",             // ← tu usuario local
        password: "Yulay123*",        // ← tu contraseña local
        database: "modulofamiliar",   // ← tu nombre de base local
        port: 5432
      }
);

module.exports = pool;
