// server.js
const express = require("express");
const path = require("path");
const app = express();
const PORT = process.env.PORT || 3000;
require("dotenv").config();

// Conexión a base de datos
const db = require("./database");

// Middlewares
app.use(express.json());
app.use(express.static(path.join(__dirname, "www")));

// Rutas
const authRoutes = require("./authRoutes");
const grupoRoutes = require("./grupoRoutes");

app.use("/api/auth", authRoutes);
app.use("/api/grupo", grupoRoutes);

// Iniciar servidor
app.listen(PORT, () => {
  console.log(`✅ Servidor activo en http://localhost:${PORT}`);
});