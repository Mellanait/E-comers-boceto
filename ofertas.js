// ─── Productos en oferta ──────────────────────────────────────────────────────
// Agrega aquí tus productos. El precio final se calcula automático.
// descuento: número del 1 al 100 (porcentaje)

const productosOferta = [
  {
    id: "of1",
    nombre: "Polera Oversize Negra",
    descripcion: "Polera de algodón premium, corte oversize ideal para el día a día.",
    precioOriginal: 19990,
    descuento: 30,
    imagen: "assets/poleras/polera3.webp",
    categoria: "poleras"
  },
  {
    id: "of2",
    nombre: "Pantalón Cargo Beige",
    descripcion: "Pantalón cargo con múltiples bolsillos, tela resistente.",
    precioOriginal: 34990,
    descuento: 20,
    imagen: "assets/pantalones/pantalon1.webp",
    categoria: "pantalones"
  },
  {
    id: "of3",
    nombre: "Chaleco Acolchado Negro",
    descripcion: "Chaleco liviano con relleno sintético, perfecto para el frío.",
    precioOriginal: 29990,
    descuento: 40,
    imagen: "assets/chalecos/chaleco1.webp",
    categoria: "chalecos"
  },
  {
    id: "of4",
    nombre: "Gorra Snapback Blanca",
    descripcion: "Gorra con visera plana y cierre ajustable en la parte trasera.",
    precioOriginal: 12990,
    descuento: 15,
    imagen: "assets/gorras/gorra1.webp",
    categoria: "gorras"
  }
  // → Agrega más productos aquí con el mismo formato
];

// ─── Cálculo automático de precios ───────────────────────────────────────────

function calcularPrecio(precioOriginal, descuento) {
  const final = Math.round(precioOriginal * (1 - descuento / 100));
  const ahorro = precioOriginal - final;
  return { final, ahorro };
}

// ─── Render cards ─────────────────────────────────────────────────────────────

let categoriaActiva = "todos";

function renderOfertas(categoria = "todos") {
  const lista = document.getElementById("listaOfertas");
  lista.innerHTML = "";

  const filtrados = categoria === "todos"
    ? productosOferta
    : productosOferta.filter(p => p.categoria === categoria);

  if (filtrados.length === 0) {
    lista.innerHTML = `
      <div class="col-12 text-center text-muted py-5">
        <i class="bi bi-tag" style="font-size: 3rem;"></i>
        <p class="mt-3">No hay ofertas en esta categoría por ahora.</p>
      </div>
    `;
    return;
  }

  filtrados.forEach(p => {
    const { final, ahorro } = calcularPrecio(p.precioOriginal, p.descuento);

    lista.innerHTML += `
      <div class="col-12 col-md-4 col-lg-3">
        <div class="card card-oferta h-100">
          <div class="position-relative">
            <img src="${p.imagen}" alt="${p.nombre}">
            <span class="badge bg-danger badge-descuento">-${p.descuento}%</span>
          </div>
          <div class="card-body d-flex flex-column justify-content-between">
            <div>
              <h6 class="fw-bold mb-1">${p.nombre}</h6>
              <div class="d-flex align-items-center gap-2 mb-3">
                <span class="precio-original">$${p.precioOriginal.toLocaleString('es-CL')}</span>
                <span class="precio-final">$${final.toLocaleString('es-CL')}</span>
              </div>
            </div>
            <div class="d-flex gap-2">
              <button class="btn btn-outline-dark btn-sm flex-grow-1"
                onclick="abrirModal('${p.id}')">
                <i class="bi bi-eye me-1"></i>Ver más
              </button>
              <button class="btn btn-dark btn-sm flex-grow-1"
                onclick="agregarAlCarrito('${p.id}')">
                <i class="bi bi-cart-plus me-1"></i>Agregar
              </button>
            </div>
          </div>
        </div>
      </div>
    `;
  });
}

// ─── Filtros ──────────────────────────────────────────────────────────────────

function filtrar(categoria) {
  categoriaActiva = categoria;

  // Actualizar estilo botones
  document.querySelectorAll("#filtros .btn").forEach(btn => {
    btn.classList.remove("btn-dark", "activo");
    btn.classList.add("btn-outline-dark");
  });

  event.target.classList.remove("btn-outline-dark");
  event.target.classList.add("btn-dark", "activo");

  renderOfertas(categoria);
}

// ─── Modal ────────────────────────────────────────────────────────────────────

function abrirModal(id) {
  const p = productosOferta.find(x => x.id === id);
  if (!p) return;

  const { final, ahorro } = calcularPrecio(p.precioOriginal, p.descuento);

  document.getElementById("modalNombre").textContent = p.nombre;
  document.getElementById("modalImagen").src = p.imagen;
  document.getElementById("modalImagen").alt = p.nombre;
  document.getElementById("modalDescripcion").textContent = p.descripcion;
  document.getElementById("modalBadge").textContent = `-${p.descuento}%`;
  document.getElementById("modalPrecioOriginal").textContent = `$${p.precioOriginal.toLocaleString('es-CL')}`;
  document.getElementById("modalPrecioFinal").textContent = `$${final.toLocaleString('es-CL')}`;
  document.getElementById("modalAhorro").textContent = `$${ahorro.toLocaleString('es-CL')}`;

  document.getElementById("modalBtnAgregar").onclick = () => {
    agregarAlCarrito(p.id);
    bootstrap.Modal.getInstance(document.getElementById("modalOferta")).hide();
  };

  new bootstrap.Modal(document.getElementById("modalOferta")).show();
}

// ─── Agregar al carrito ───────────────────────────────────────────────────────

function agregarAlCarrito(id) {
  const usuario = JSON.parse(localStorage.getItem("usuarioLogeado"));

  if (!usuario) {
    window.location.href = "log.html";
    return;
  }

  const p = productosOferta.find(x => x.id === id);
  if (!p) return;

  const { final } = calcularPrecio(p.precioOriginal, p.descuento);
  const claveCarrito = `carrito_${usuario.email}`;
  const carrito = JSON.parse(localStorage.getItem(claveCarrito)) || [];

  const existe = carrito.find(x => x.id === p.id);

  if (existe) {
    existe.cantidad += 1;
  } else {
    carrito.push({
      id: p.id,
      nombre: p.nombre,
      precio: final,           // Se guarda el precio con descuento
      imagen: p.imagen,
      cantidad: 1
    });
  }

  localStorage.setItem(claveCarrito, JSON.stringify(carrito));

  // Feedback visual
  mostrarToast(`${p.nombre} agregado al carrito`);
}

// ─── Toast de confirmación ────────────────────────────────────────────────────

function mostrarToast(mensaje) {
  // Si no existe el contenedor, lo crea
  let contenedor = document.getElementById("toastContenedor");
  if (!contenedor) {
    contenedor = document.createElement("div");
    contenedor.id = "toastContenedor";
    contenedor.className = "position-fixed bottom-0 end-0 p-3";
    contenedor.style.zIndex = 9999;
    document.body.appendChild(contenedor);
  }

  const id = "toast_" + Date.now();
  contenedor.innerHTML += `
    <div id="${id}" class="toast align-items-center text-bg-dark border-0 show" role="alert">
      <div class="d-flex">
        <div class="toast-body">
          <i class="bi bi-check-circle me-2"></i>${mensaje}
        </div>
        <button type="button" class="btn-close btn-close-white me-2 m-auto" data-bs-dismiss="toast"></button>
      </div>
    </div>
  `;

  // Auto-desaparece en 3s
  setTimeout(() => {
    const el = document.getElementById(id);
    if (el) el.remove();
  }, 3000);
}

// ─── Navbar ───────────────────────────────────────────────────────────────────

function iniciarNavbar() {
  const usuario = JSON.parse(localStorage.getItem("usuarioLogeado"));
  const userBtn = document.getElementById("userBtn");
  if (userBtn) {
    userBtn.addEventListener("click", () => {
      window.location.href = usuario ? "perfil.html" : "log.html";
    });
  }
}

// ─── Inicio ───────────────────────────────────────────────────────────────────

renderOfertas();