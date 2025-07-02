// server.js
const express = require("express");
const path = require("path");
const cors = require("cors");
require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 3000;

// Conexión a base de datos
const db = require("../server/database.js");

// Middlewares
app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, "www")));

// Rutas
const authRoutes = require("../server/authRoutes.js");
const grupoRoutes = require("../server/grupoRoutes.js");

app.use("/api/auth", authRoutes);
app.use("/api/grupo", grupoRoutes);

// Iniciar servidor
app.listen(PORT, () => {
  console.log(`✅ Servidor activo en http://localhost:${PORT}`);
});