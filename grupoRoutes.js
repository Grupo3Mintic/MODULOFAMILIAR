const express = require("express");
const router = express.Router();
const pool = require("./server/database");

router.get("/familia/:grupoId", async (req, res) => {
  try {
    const { grupoId } = req.params;
    const miembros = await pool.query(
      "SELECT id, nombre, avatar FROM usuarios WHERE grupo_familiar_id = $1",
      [grupoId]
    );
    res.json(miembros.rows);
  } catch (err) {
    res.status(500).send("Error al obtener miembros");
  }
});

router.get("/bitacora/:usuarioId", async (req, res) => {
  try {
    const { usuarioId } = req.params;
    const bitacora = await pool.query(
      "SELECT fecha, tipo_servicio, observaciones FROM bitacora_salud WHERE usuario_id = $1 ORDER BY fecha DESC",
      [usuarioId]
    );
    res.json(bitacora.rows);
  } catch (err) {
    res.status(500).send("Error al obtener bitácora");
  }
});

module.exports = router;
router.post("/bitacora_salud", async (req, res) => {
  try {
    const { usuario_id, fecha, tipo_servicio, observaciones } = req.body;

    if (!usuario_id || !fecha || !tipo_servicio || !observaciones) {
      return res.status(400).send("Todos los campos son obligatorios.");
    }

    await pool.query(
      "INSERT INTO bitacora_salud (usuario_id, fecha, tipo_servicio, observaciones) VALUES ($1, $2, $3, $4)",
      [usuario_id, fecha, tipo_servicio, observaciones]
    );

    res.status(201).send("Entrada registrada correctamente.");
  } catch (err) {
    console.error("Error al guardar en bitácora_salud:", err);
    res.status(500).send("Error al guardar la entrada.");
  }
});