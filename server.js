// server.js
const express = require("express");
const path = require("path");
const cors = require("cors");
require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 3000;

// Conexión a base de datos
const db = require("./server/database");

// Middlewares
app.use(cors()); // Habilita CORS
app.use(express.json());
app.use(express.static(path.join(__dirname, "www")));

// Rutas
const authRoutes = require("./server/authRoutes");
const grupoRoutes = require("./server/grupoRoutes");

app.use("/api/auth", authRoutes);
app.use("/api/grupo", grupoRoutes);

// Iniciar servidor
app.listen(PORT, () => {
  console.log(`✅ Servidor activo en el puerto ${PORT}`);
});
