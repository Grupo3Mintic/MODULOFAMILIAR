// login.js

// Detecta si está en desarrollo local o producción
const dev = false; // cámbialo a true solo si estás en localhost

const baseURL = dev
  ? "http://localhost:3000"
  : "https://modulofamiliar.onrender.com"; // URL del backend en Render

document.getElementById("formLogin").onsubmit = async (e) => {
  e.preventDefault();

  const data = Object.fromEntries(new FormData(e.target));
  console.log("🔐 Enviando datos de login:", data);

  try {
    const res = await fetch(`${baseURL}/api/auth/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });

    console.log("📡 Código de respuesta:", res.status);

    const contentType = res.headers.get("content-type");

    if (res.ok) {
      // ✅ Si la respuesta es exitosa y es JSON
      const user = contentType?.includes("application/json")
        ? await res.json()
        : { mensaje: await res.text() };

      console.log("✅ Login exitoso:", user);
      localStorage.setItem("usuario", JSON.stringify(user));
      window.location.href = "index.html";

    } else {
      // ⚠️ Si la respuesta es error, intentamos leer JSON o texto
      const errorMsg = contentType?.includes("application/json")
        ? (await res.json()).error
        : await res.text();

      alert(errorMsg || "Correo o contraseña inválidos.");
    }

  } catch (err) {
    console.error("❌ Error de red:", err);
    alert("No se pudo contactar con el servidor.");
  }
};
