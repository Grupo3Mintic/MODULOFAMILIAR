document.getElementById("formRegistro").onsubmit = async e => {
  e.preventDefault();

  const data = Object.fromEntries(new FormData(e.target));

  // ⚠️ Asegura que avatar tenga un valor por defecto si está vacío
  if (!data.avatar || data.avatar.trim() === "") {
    data.avatar = "avatar_generico.png"; // Ajusta según tu imagen disponible
  }

  console.log("⏳ Enviando datos de registro:", data);

  try {
    const res = await fetch("/api/auth/registro", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data)
    });

    if (res.ok) {
      alert("✅ Registro exitoso");
      window.location.href = "login.html";
    } else {
      const error = await res.text();
      alert("❌ Registro fallido: " + error);
    }

  } catch (err) {
    console.error("❗ Error al conectar con backend:", err);
    alert("No se pudo conectar con el servidor.");
  }
};