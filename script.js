
  document.querySelectorAll('.ver-mas').forEach(boton => {
    boton.addEventListener('click', () => {
      document.getElementById('modalTitulo').textContent = boton.dataset.nombre;
      document.getElementById('modalPrecio').textContent = '$' + boton.dataset.precio;
      document.getElementById('modalDescripcion').textContent = boton.dataset.descripcion;
      document.getElementById('modalImagen').src = boton.dataset.imagen;
    });
  });


