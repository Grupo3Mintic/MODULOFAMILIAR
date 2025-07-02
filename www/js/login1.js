document.getElementById("formLogin").onsubmit = async e => {
  e.preventDefault();

  const data = Object.fromEntries(new FormData(e.target));
  console.log("Enviando datos de login:", data);

  try {
    const res = await fetch("/api/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data)
    });

    console.log("Código de respuesta:", res.status);

    if (res.ok) {
      const user = await res.json();
      console.log("Login exitoso:", user);
      localStorage.setItem("usuario", JSON.stringify(user));
      window.location.href = "index.html";
    } else {
      const error = await res.text();
      alert(error || "Correo o contraseña inválidos.");
    }
  } catch (err) {
    console.error("Error al conectar con el servidor:", err);
    alert("No se pudo contactar con el servidor.");
  }
};