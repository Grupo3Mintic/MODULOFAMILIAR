const express = require("express");
const router = express.Router();
const pool = require("./database");
const bcrypt = require("bcrypt");

// ✅ Validar campos vacíos
function camposFaltantes(obj, campos) {
  return campos.some(c => !obj[c] || obj[c].toString().trim() === "");
}

// 📌 REGISTRO DE USUARIO
router.post("/registro", async (req, res) => {
  try {
    const { nombre, correo, clave, avatar, grupo_familiar_id } = req.body;

    if (camposFaltantes(req.body, ["nombre", "correo", "clave", "grupo_familiar_id"])) {
      return res.status(400).send("Faltan datos requeridos para el registro.");
    }

    if (clave.length < 6) {
      return res.status(400).send("La contraseña debe tener al menos 6 caracteres.");
    }

    const existe = await pool.query("SELECT id FROM usuarios WHERE correo = $1", [correo]);
    if (existe.rowCount > 0) {
      return res.status(400).send("Este correo ya está registrado.");
    }

    const hash = await bcrypt.hash(clave, 10);
    await pool.query(
      "INSERT INTO usuarios (nombre, correo, clave, avatar, grupo_familiar_id) VALUES ($1, $2, $3, $4, $5)",
      [nombre, correo, hash, avatar, grupo_familiar_id]
    );

    res.status(201).send("Usuario registrado correctamente.");
  } catch (err) {
    console.error("Error en registro:", err);
    res.status(500).send("Error interno al registrar.");
  }
});

// 📌 LOGIN DE USUARIO
router.post("/login", async (req, res) => {
  try {
    const { correo, clave } = req.body;

    if (camposFaltantes(req.body, ["correo", "clave"])) {
      return res.status(400).send("Debes ingresar tu correo y contraseña.");
    }

    const result = await pool.query("SELECT * FROM usuarios WHERE correo = $1", [correo]);
    const usuario = result.rows[0];

    if (!usuario) {
      return res.status(401).send("Correo no registrado.");
    }

    const coincide = await bcrypt.compare(clave, usuario.clave);
    if (!coincide) {
      return res.status(401).send("Contraseña incorrecta.");
    }

    res.json({
      usuarioId: usuario.id,
      grupoId: usuario.grupo_familiar_id,
      nombre: usuario.nombre,
      avatar: usuario.avatar
    });

  } catch (err) {
    console.error("Error al iniciar sesión:", err);
    res.status(500).send("Error interno al iniciar sesión.");
  }
});

// 📌 OPCIONAL: Registrar entrada de bitácora (puede moverse a grupoRoutes.js)
router.post("/bitacora", async (req, res) => {
  try {
    const { usuario_id, fecha, tipo_servicio, observaciones } = req.body;

    if (!usuario_id || !fecha || !tipo_servicio || !observaciones) {
      return res.status(400).send("Todos los campos son requeridos.");
    }

    await pool.query(
      "INSERT INTO bitacora_salud (usuario_id, fecha, tipo_servicio, observaciones) VALUES ($1, $2, $3, $4)",
      [usuario_id, fecha, tipo_servicio, observaciones]
    );

    res.status(201).send("Entrada de bitácora registrada.");
  } catch (err) {
    console.error("Error al registrar bitácora:", err);
    res.status(500).send("Error interno al guardar entrada.");
  }
});

module.exports = router;