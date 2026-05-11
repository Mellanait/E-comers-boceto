const usuario = JSON.parse(localStorage.getItem('usuarioLogeado'));

if (!usuario) {
  window.location.href = "log.html";
}

const claveCarrito = `carrito_${usuario.email}`;
let carrito = JSON.parse(localStorage.getItem(claveCarrito)) || [];

const contenedor = document.getElementById('listaCarrito');
const totalEl = document.getElementById('total');
const subtotalEl = document.getElementById('subtotal');

// ─── Renderizado principal ───────────────────────────────────────────────────

function renderCarrito() {
  contenedor.innerHTML = "";

  if (carrito.length === 0) {
    contenedor.innerHTML = `
      <div class="text-center py-5 text-muted">
        <i class="bi bi-cart-x" style="font-size: 4rem;"></i>
        <h4 class="mt-3">Tu carrito está vacío</h4>
        <p>Agrega productos desde la tienda.</p>
        <button class="btn btn-dark mt-2" onclick="volverHome()">Ir a la tienda</button>
      </div>
    `;
    actualizarTotal();
    return;
  }

  carrito.forEach(p => {
    const subtotalProducto = p.precio * p.cantidad;

    contenedor.innerHTML += `
      <div class="card border-0 shadow-sm mb-3" id="producto-${p.id}">
        <div class="row g-0 align-items-center">
          <div class="col-3">
            <img src="${p.imagen}" class="img-fluid rounded-start" style="height: 120px; object-fit: cover; width: 100%;" alt="${p.nombre}">
          </div>
          <div class="col-9">
            <div class="card-body d-flex justify-content-between align-items-center flex-wrap gap-2">
              <div>
                <h6 class="fw-bold mb-1">${p.nombre}</h6>
                <p class="text-muted mb-0">$${p.precio} c/u</p>
              </div>
              <div class="d-flex align-items-center gap-2">
                <button class="btn btn-outline-secondary btn-sm" onclick="cambiarCantidad('${p.id}', -1)">
                  <i class="bi bi-dash"></i>
                </button>
                <span class="fw-bold px-1">${p.cantidad}</span>
                <button class="btn btn-outline-secondary btn-sm" onclick="cambiarCantidad('${p.id}', 1)">
                  <i class="bi bi-plus"></i>
                </button>
              </div>
              <div class="text-end">
                <p class="fw-bold mb-1">$${subtotalProducto}</p>
                <button class="btn btn-sm btn-outline-danger" onclick="eliminarProducto('${p.id}')">
                  <i class="bi bi-trash"></i>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    `;
  });

  actualizarTotal();
}

// ─── Total ───────────────────────────────────────────────────────────────────

function actualizarTotal() {
  const total = carrito.reduce((acc, p) => acc + p.precio * p.cantidad, 0);
  totalEl.textContent = "$" + total;
  subtotalEl.textContent = "$" + total;
}

// ─── Acciones ────────────────────────────────────────────────────────────────

function cambiarCantidad(id, delta) {
  const index = carrito.findIndex(p => p.id === id);
  if (index === -1) return;

  carrito[index].cantidad += delta;

  // Si llega a 0, elimina el producto
  if (carrito[index].cantidad <= 0) {
    carrito.splice(index, 1);
  }

  guardarYRenderizar();
}

function eliminarProducto(id) {
  carrito = carrito.filter(p => p.id !== id);
  guardarYRenderizar();
}

function vaciarCarrito() {
  if (carrito.length === 0) return;
  carrito = [];
  guardarYRenderizar();
}

function guardarYRenderizar() {
  localStorage.setItem(claveCarrito, JSON.stringify(carrito));
  renderCarrito();
}

function volverHome() {
  window.location.href = "1-contenedor.html";
}

function checkout() {
  alert("Próximamente: pasarela de pagos 🚀");
}

// ─── Navbar ──────────────────────────────────────────────────────────────────

function iniciarNavbar() {
  const usuario = JSON.parse(localStorage.getItem('usuarioLogeado'));
  const userBtn = document.getElementById('userBtn');

  if (userBtn) {
    userBtn.addEventListener('click', () => {
      window.location.href = usuario ? "perfil.html" : "log.html";
    });
  }
}

// ─── Inicio ──────────────────────────────────────────────────────────────────

renderCarrito();