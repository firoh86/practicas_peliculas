const login = document.getElementById('loginButton')

const loginModal = document.getElementById('loginModal')
const modalBox = document.getElementById('loginBox')
const loginExit = document.getElementById('loginExit')
const formLogin = document.getElementById('form-login')
// login
const user = document.getElementById('user')
const pass = document.getElementById('password')
const session = document.getElementById('sessionInit')
// setea un usuario para logear
class Usuario {
  constructor(user, password, peliculas) {
    this.user = user
    this.password = password
    this.peliculas = peliculas
  }
}
if (login) {
  login.addEventListener('click', () => {
    if (!loginModal.classList.contains('show--bg')) {
      modalBox.classList.add('show--modal')
      loginModal.classList.add('show--bg')
    }
  })
}
if (loginExit) {
  loginExit.addEventListener('click', () => {
    if (loginModal.classList.contains('show--bg')) {
      modalBox.classList.remove('show--modal')
      loginModal.classList.remove('show--bg')
    }
  })
}
if (formLogin) {
  formLogin.addEventListener('submit', (e) => {
    e.preventDefault()
  })
}
if (session) {
  // login user pass
  session.addEventListener('click', () => {
    if (user.value.trim() != '' && pass.value.trim() != '')
      check(user.value.trim(), pass.value.trim())
  })
}
const check = (user, password) => {

  if (localStorage.getItem(user) != null) {
    const checkPass = JSON.parse(localStorage.getItem(user))
    if (checkPass.password == password) {
      console.log('Se ha logeado el usuario: ' + user)
      // guarda usuario en la sesion
      sessionStorage.clear()
      sessionStorage.setItem('usuario', user)
      window.location.href = 'films.html'
    }
  } else {
    const usuario1 = new Usuario(user, password, '')
    localStorage.setItem(user, JSON.stringify(usuario1))
    sessionStorage.clear()
    sessionStorage.setItem('usuario', user)
    console.log('Se ha creado un nuevo usuario con user:' + user)
    window.location.href = 'films.html'
  }

}