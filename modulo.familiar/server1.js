// server.js
const express = require("express");
const path = require("path");
const app = express();
const PORT = process.env.PORT || 3000;
require("dotenv").config();

// Conexión a base de datos
const db = require("../server/database1");

// Middlewares
app.use(express.json());
app.use(express.static(path.join(__dirname, "www")));
const cors = require("cors");
app.use(cors());

// Rutas
const authRoutes = require("../server/authRoutes");
const grupoRoutes = require("../server/grupoRoutes");

app.use("/api/auth", authRoutes);
app.use("/api/grupo", grupoRoutes);

// Iniciar servidor
app.listen(PORT, () => {
  console.log(`✅ Servidor activo en http://localhost:${PORT}`);
});