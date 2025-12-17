const usuario = JSON.parse(localStorage.getItem('usuarioLogeado'));

if (!usuario) {
  window.location.href = "log.html";
}

const claveCarrito = `carrito_${usuario.email}`;
let carrito = JSON.parse(localStorage.getItem(claveCarrito)) || [];

const contenedor = document.getElementById('listaCarrito');
const totalEl = document.getElementById('total');

let total = 0;

contenedor.innerHTML = "";

carrito.forEach(p => {
  total += p.precio * p.cantidad;

  contenedor.innerHTML += `
    <div class="card mb-3" style="max-width: 500px;">
      <div class="row g-0">
        <div class="col-4">
          <img src="${p.imagen}" class="img-fluid rounded-start">
        </div>
        <div class="col-8">
          <div class="card-body">
            <h5>${p.nombre}</h5>
            <p>$${p.precio}</p>
            <p>Cantidad: ${p.cantidad}</p>
            <button class="btn btn-sm btn-danger" onclick="eliminarProducto('${p.id}')">Eliminar</button>
          </div>
        </div>
      </div>
    </div>
  `;
});

totalEl.textContent = "Total: $" + total;

function eliminarProducto(id) {
  carrito = carrito.filter(p => p.id !== id);
  localStorage.setItem(claveCarrito, JSON.stringify(carrito));
  location.reload();
}

function vaciarCarrito() {
  localStorage.removeItem(claveCarrito);
  location.reload();
}

function volverHome() {
  window.location.href = "1-contenedor.html";
}


function iniciarNavbar() {
  const usuario = JSON.parse(localStorage.getItem('usuarioLogeado'));
  const userBtn = document.getElementById('userBtn');

  if (userBtn) {
    userBtn.addEventListener('click', () => {
      if (!usuario) {
        window.location.href = "log.html";
      } else {
        window.location.href = "perfil.html";
      }
    });
  }
}
