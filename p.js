const usuario = JSON.parse(localStorage.getItem('usuarioLogeado'));


if (!usuario) {
  window.location.href = "log.html";
}


const perfilEmail = document.getElementById('perfilEmail');
if (perfilEmail) {
  perfilEmail.textContent = usuario.email;
}


const guardarCambios = document.getElementById('guardarCambios');
const nuevoPassword = document.getElementById('nuevoPassword');

if (guardarCambios && nuevoPassword) {
  guardarCambios.addEventListener('click', () => {
    let usuarios = JSON.parse(localStorage.getItem('usuarios')) || [];

    usuarios = usuarios.map(u => {
      if (u.email === usuario.email) {
        u.password = nuevoPassword.value;
      }
      return u;
    });

    localStorage.setItem('usuarios', JSON.stringify(usuarios));

    usuario.password = nuevoPassword.value;
    localStorage.setItem('usuarioLogeado', JSON.stringify(usuario));

    alert("Perfil actualizado");
    nuevoPassword.value = "";
  });
}


function logout() {
  localStorage.removeItem('usuarioLogeado');
  window.location.href = "1-contenedor.html";
}
