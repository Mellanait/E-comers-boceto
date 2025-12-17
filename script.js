/***********************
 * USUARIO / NAVBAR
 ***********************/
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

/***********************
 * MODAL VER MÁS
 ***********************/
let productoActual = null;

document.querySelectorAll('.ver-mas').forEach(boton => {
  boton.addEventListener('click', () => {
    productoActual = {
      id: boton.dataset.id,
      nombre: boton.dataset.nombre,
      precio: Number(boton.dataset.precio),
      imagen: boton.dataset.imagen,
      cantidad: 1
    };

    document.getElementById('modalTitulo').textContent = productoActual.nombre;
    document.getElementById('modalPrecio').textContent = '$' + productoActual.precio;
    document.getElementById('modalDescripcion').textContent = boton.dataset.descripcion;
    document.getElementById('modalImagen').src = productoActual.imagen;
  });
});

/***********************
 * AGREGAR AL CARRITO (DESDE CARD)
 ***********************/
document.querySelectorAll('.agregar-carrito').forEach(btn => {
  btn.addEventListener('click', () => {
    const usuario = JSON.parse(localStorage.getItem('usuarioLogeado'));

    if (!usuario) {
      alert("Debes iniciar sesión para agregar al carrito");
      window.location.href = "log.html";
      return;
    }

    const producto = {
      id: btn.dataset.id,
      nombre: btn.dataset.nombre,
      precio: Number(btn.dataset.precio),
      imagen: btn.dataset.imagen,
      cantidad: 1
    };

    const claveCarrito = `carrito_${usuario.email}`;
    let carrito = JSON.parse(localStorage.getItem(claveCarrito)) || [];

    const existe = carrito.find(p => p.id === producto.id);
    if (existe) {
      existe.cantidad++;
    } else {
      carrito.push(producto);
    }

    localStorage.setItem(claveCarrito, JSON.stringify(carrito));
    alert("Producto agregado al carrito 🛒");
  });
});

/***********************
 * AGREGAR AL CARRITO (DESDE MODAL)
 ***********************/
const btnAgregarModal = document.getElementById('btnAgregarModal');

if (btnAgregarModal) {
  btnAgregarModal.addEventListener('click', () => {
    const usuario = JSON.parse(localStorage.getItem('usuarioLogeado'));

    if (!usuario) {
      alert("Debes iniciar sesión para agregar al carrito");
      window.location.href = "log.html";
      return;
    }

    if (!productoActual) return;

    const claveCarrito = `carrito_${usuario.email}`;
    let carrito = JSON.parse(localStorage.getItem(claveCarrito)) || [];

    const existe = carrito.find(p => p.id === productoActual.id);
    if (existe) {
      existe.cantidad++;
    } else {
      carrito.push(productoActual);
    }

    localStorage.setItem(claveCarrito, JSON.stringify(carrito));
    alert("Producto agregado al carrito 🛒");
  });
}

/***********************
 * BUSCADOR DE PRODUCTOS
 ***********************/
function iniciarBuscador() {
  const buscador = document.getElementById('buscador');
  const productos = document.querySelectorAll('.producto');

  if (!buscador) return;

  buscador.addEventListener('input', () => {
    const texto = buscador.value.toLowerCase();

    productos.forEach(producto => {
      const nombre = producto
        .querySelector('.card-title')
        .textContent
        .toLowerCase();

      producto.style.display = nombre.includes(texto)
        ? "flex"
        : "none";
    });
  });
}
setTimeout(() => {
  const buscador = document.getElementById('buscador');
  const productos = document.querySelectorAll('.producto');

  if (!buscador) return;

  buscador.addEventListener('input', () => {
    const texto = buscador.value.toLowerCase();

    productos.forEach(producto => {
      const nombre = producto
        .querySelector('.card-title')
        .textContent
        .toLowerCase();

      producto.style.display = nombre.includes(texto)
        ? "flex"
        : "none";
    });
  });
}, 300);

