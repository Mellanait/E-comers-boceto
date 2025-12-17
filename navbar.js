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
