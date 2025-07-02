document.getElementById("formRegistro").onsubmit = async e => {
  e.preventDefault();

  const data = Object.fromEntries(new FormData(e.target));

  const edad = parseInt(data.edad, 10);
  const genero = data.genero;

  if (!genero || isNaN(edad)) {
    return alert("Por favor selecciona género y edad válida.");
  }

  // Asignar avatar automáticamente
  if (genero === "masculino") {
    if (edad < 13) data.avatar = "nino.png";
    else if (edad < 18) data.avatar = "adolescente_hombre.png";
    else data.avatar = "hombre.png";
  } else if (genero === "femenino") {
    if (edad < 13) data.avatar = "nina.png";
    else if (edad < 18) data.avatar = "adolescente_mujer.png";
    else data.avatar = "mujer.png";
  } else {
    data.avatar = "avatar_generico.png";
  }

  console.log("Registrando con avatar:", data.avatar);

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
    console.error("❗ Error al conectar:", err);
    alert("No se pudo contactar con el servidor.");
  }
};