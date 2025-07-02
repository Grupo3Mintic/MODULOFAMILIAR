function mostrarMenu() {
  const menu = document.getElementById("menuLateral");
  menu.classList.toggle("activo");
}

function cargarMenu() {
  const menu = document.getElementById("menuLateral");
  const usuario = JSON.parse(localStorage.getItem("usuario"));

  if (usuario) {
    menu.innerHTML = `
      <p>Bienvenido, ${usuario.nombre}</p>
      <button onclick="window.location.href='bitacora.html'">Bitácora</button>
      <button onclick="window.location.href='alimentos.html'">Alimentos</button>
      <button onclick="cerrarSesion()">Cerrar sesión</button>
    `;
  } else {
    menu.innerHTML = `
      <button onclick="window.location.href='login.html'">Iniciar sesión</button>
      <button onclick="window.location.href='registro.html'">Registrarse</button>
    `;
  }
}

function cerrarSesion() {
  localStorage.removeItem("usuario");
  location.reload();
}

function iniciarCarrusel() {
  const imagenes = [
    "img/carrusel1.jpg",
    "img/carrusel2.jpg",
    "img/carrusel3.jpg"
  ];
  let i = 0;
  setInterval(() => {
    i = (i + 1) % imagenes.length;
    document.getElementById("imagenCarrusel").src = imagenes[i];
  }, 3000);
}

window.onload = () => {
  cargarMenu();
  iniciarCarrusel();
};
