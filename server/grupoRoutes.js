const express = require("express");
const router  = express.Router();
const pool    = require("./database");

// Ruta para registrar en bitácora de salud
router.post("/bitacora", async (req, res) => {
  try {
    const { usuario_id, fecha, tipo_servicio, observaciones } = req.body;
    if (!usuario_id || !fecha || !tipo_servicio || !observaciones) {
      return res.status(400).send("Todos los campos son requeridos.");
    }
    await pool.query(
      "INSERT INTO bitacora_salud (usuario_id, fecha, tipo_servicio, observaciones) VALUES ($1,$2,$3,$4)",
      [usuario_id, fecha, tipo_servicio, observaciones]
    );
    res.status(201).send("Entrada de bitácora registrada.");
  } catch (err) {
    console.error("Error al registrar bitácora:", err);
    res.status(500).send("Error interno al guardar entrada.");
  }
});

module.exports = router;