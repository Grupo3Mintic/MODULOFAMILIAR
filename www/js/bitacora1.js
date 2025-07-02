const user = JSON.parse(localStorage.getItem("usuario"));
if (!user) {
  alert("Inicia sesión primero.");
  window.location.href = "login.html";
}

const contenedor = document.getElementById("familia-container");
fetch(`/api/grupo/familia/${user.grupoId}`)
  .then(res => res.json())
  .then(data => {
    data.forEach(m => {
      const div = document.createElement("div");
      div.className = "miembro";
      div.innerHTML = `
        <img src="img/${m.avatar}" width="80" height="80" style="border-radius: 50%">
        <p>${m.nombre}</p>
      `;
      div.onclick = () => cargarBitacora(m.id);
      contenedor.appendChild(div);
    });
  });

function cargarBitacora(id) {
  fetch(`/api/grupo/bitacora/${id}`)
    .then(res => res.json())
    .then(data => {
      const cont = document.getElementById("bitacora-container");
      cont.innerHTML = data.map(item => `
        <div><strong>${item.fecha}</strong> — ${item.tipo_servicio}<br><em>${item.observaciones}</em></div>
      `).join("<hr>");
    });
}