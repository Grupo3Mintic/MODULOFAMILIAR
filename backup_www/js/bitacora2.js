// Validar que el usuario haya iniciado sesión
const user = JSON.parse(localStorage.getItem("usuario"));
if (!user) {
  alert("Inicia sesión primero.");
  window.location.href = "login.html";
}

// Referencia al contenedor donde se mostrarán los miembros
const contenedor = document.getElementById("familia-container");

// Función para asignar avatar por edad y género si no viene del backend
function determinarAvatar(genero, edad) {
  if (genero === "masculino") {
    if (edad < 13) return "nino.png";
    if (edad < 18) return "adolescente_hombre.png";
    return "hombre.png";
  } else if (genero === "femenino") {
    if (edad < 13) return "nina.png";
    if (edad < 18) return "adolescente_mujer.png";
    return "mujer.png";
  }
  return "avatar_generico.png";
}

// Obtener los miembros del grupo familiar
fetch(`/api/grupo/familia/${user.grupoId}`)
  .then(res => res.json())
  .then(data => {
    console.log("Miembros del grupo:", data);
    data.forEach(m => {
      const div = document.createElement("div");
      div.className = "miembro";

      // Determinar avatar si no viene desde la base de datos
      const avatar = m.avatar || determinarAvatar(m.genero, m.edad);

      div.innerHTML = `
        <img src="/img/${avatar}" width="80" height="80" style="border-radius: 50%">
        <p>${m.nombre}</p>
      `;
      div.onclick = () => cargarBitacora(m.id);
      contenedor.appendChild(div);
    });
  })
  .catch(err => {
    console.error("Error cargando miembros:", err);
    alert("No se pudo cargar el grupo familiar.");
  });

// Función para cargar la bitácora de salud de un miembro
function cargarBitacora(id) {
  fetch(`/api/grupo/bitacora/${id}`)
    .then(res => res.json())
    .then(data => {
      const cont = document.getElementById("bitacora-container");

      if (data.length === 0) {
        cont.innerHTML = "<p>No hay registros de salud para este miembro.</p>";
        return;
      }

      cont.innerHTML = data.map(item => `
        <div>
          <strong>${item.fecha}</strong> — ${item.tipo_servicio}<br>
          <em>${item.observaciones}</em>
        </div>
      `).join("<hr>");
    })
    .catch(err => {
      console.error("Error al cargar bitácora:", err);
      alert("No se pudo cargar la bitácora del usuario.");
    });
}
const form = document.getElementById("formBitacora");
form.onsubmit = async e => {
  e.preventDefault();
  const data = Object.fromEntries(new FormData(form));
  data.usuario_id = user.usuarioId;

  try {
    const res = await fetch("/api/grupo/bitacora", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data)
    });

    if (res.ok) {
      alert("✅ Entrada registrada");
      form.reset();
      cargarBitacora(user.usuarioId); // recarga la vista
    } else {
      const error = await res.text();
      alert("❌ No se pudo guardar: " + error);
    }

  } catch (err) {
    console.error("Error al guardar entrada:", err);
    alert("Error al contactar el servidor.");
  }
};