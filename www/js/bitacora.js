// Validar que el usuario haya iniciado sesión
const user = JSON.parse(localStorage.getItem("usuario"));
if (!user) {
  alert("Inicia sesión primero.");
  window.location.href = "login.html";
}

// 🌐 Detecta si está en local o en servidor
const baseURL = window.location.hostname.includes("localhost")
  ? "http://localhost:3000"
  : "https://modulofamiliar.onrender.com"; // REEMPLAZA con la URL real de tu backend
  

// Elementos del DOM
const contenedor = document.getElementById("familia-container");
const form = document.getElementById("formBitacora");
const bitacoraContenedor = document.getElementById("bitacora-container");

let miembroActivoId = null; // ID del miembro actualmente seleccionado

// Función para asignar avatar si no se trae desde backend
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

// Mostrar los miembros del grupo familiar
fetch(`${baseURL}/api/grupo/familia/${user.grupoId}`)
  .then(res => res.json())
  .then(data => {
    console.log("Miembros del grupo:", data);
    data.forEach(m => {
      const div = document.createElement("div");
      div.className = "miembro";

      const avatar = m.avatar || determinarAvatar(m.genero, m.edad);

      div.innerHTML = `
        <img src="/img/${avatar}" width="80" height="80" style="border-radius: 50%">
        <p>${m.nombre}</p>
      `;

      // Evento para seleccionar al miembro y cargar su bitácora
      div.onclick = () => {
        miembroActivoId = m.id;
        cargarBitacora(m.id);
        resaltarSeleccion(div); // opcional para destacar al seleccionado
      };

      contenedor.appendChild(div);
    });
  })
  .catch(err => {
    console.error("Error cargando miembros:", err);
    alert("No se pudo cargar el grupo familiar.");
  });

// Función para mostrar la bitácora del miembro seleccionado
function cargarBitacora(id) {
  fetch(`${baseURL}/api/grupo/bitacora/${id}`)
    .then(res => res.json())
    .then(data => {
      if (data.length === 0) {
        bitacoraContenedor.innerHTML = "<p>No hay registros de salud para este miembro.</p>";
        return;
      }

      bitacoraContenedor.innerHTML = data.map(item => `
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

// Manejar el envío del formulario para agregar nueva entrada
form.onsubmit = async e => {
  e.preventDefault();

  if (!miembroActivoId) {
    alert("Selecciona un miembro del grupo familiar para registrar la entrada.");
    return;
  }

  const data = Object.fromEntries(new FormData(form));
  data.usuario_id = miembroActivoId;

  try {
    const res = await fetch(`${baseURL}/api/grupo/bitacora`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data)
    });

    if (res.ok) {
      alert("✅ Entrada registrada");
      form.reset();
      cargarBitacora(miembroActivoId);
    } else {
      const error = await res.text();
      alert("❌ No se pudo guardar: " + error);
    }
  } catch (err) {
    console.error("Error al guardar entrada:", err);
    alert("Error al contactar el servidor.");
  }
};

// (Opcional) Marcar al miembro seleccionado visualmente
function resaltarSeleccion(divSeleccionado) {
  const todos = document.querySelectorAll(".miembro");
  todos.forEach(d => d.style.border = "none");
  divSeleccionado.style.border = "2px solid green";
}