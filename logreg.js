
const usuario = JSON.parse(localStorage.getItem('usuarioLogeado'));

if (usuario) {
  window.location.href = "1-contenedor.html";
}


const formRegistro = document.getElementById('formRegistro');

if (formRegistro) {
  formRegistro.addEventListener('submit', e => {
    e.preventDefault();

    const email = regEmail.value;
    const password = regPassword.value;

    let usuarios = JSON.parse(localStorage.getItem('usuarios')) || [];

    const existe = usuarios.some(u => u.email === email);
    if (existe) {
      registroMsg.textContent = "El usuario ya existe";
      registroMsg.className = "text-danger";
      return;
    }

    usuarios.push({ email, password });
    localStorage.setItem('usuarios', JSON.stringify(usuarios));

    registroMsg.textContent = "Registro exitoso, redirigiendo...";
    registroMsg.className = "text-success";

    setTimeout(() => {
      window.location.href = "log.html";
    }, 1500);
  });
}


const formLogin = document.getElementById('formLogin');

if (formLogin) {
  formLogin.addEventListener('submit', e => {
    e.preventDefault();

    const email = loginEmail.value;
    const password = loginPassword.value;

    let usuarios = JSON.parse(localStorage.getItem('usuarios')) || [];

    const user = usuarios.find(
      u => u.email === email && u.password === password
    );

    if (!user) {
      loginMsg.textContent = "Credenciales incorrectas";
      loginMsg.className = "text-danger";
      return;
    }

    localStorage.setItem('usuarioLogeado', JSON.stringify(user));

    loginMsg.textContent = "Login exitoso";
    loginMsg.className = "text-success";

    setTimeout(() => {
      window.location.href = "1-contenedor.html";
    }, 1000);
  });
}
