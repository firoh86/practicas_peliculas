
const filmContainer = document.getElementById('films-container')
const searchField = document.getElementById('search-field')
const searchButton = document.getElementById('search-button')
let userSession = ''
let favFilms = new Array()
let allFilms = new Array()
const fragment = document.createDocumentFragment()

// inicializa usuario y lista de peliculas favoritas
userSession = sessionStorage.getItem('usuario')
let objetoUsuario = JSON.parse(localStorage.getItem(userSession))
let filmsFav = Array.from(objetoUsuario.peliculas)
favFilms = filmsFav
// console.log(favFilms)
// -----------------------------------------------------

if (searchButton) {
  searchButton.addEventListener('click', (e) => {
    // apikey a9832fb4
    e.preventDefault()
    const tittle = searchField.value.trim()
    console.log(tittle)

    // info pelicula
    if (tittle != '') {
      if (filmContainer.classList.contains('--oneFilm')) filmContainer.classList.remove('--oneFilm')
      filmContainer.innerHTML = ''
      fetch(`http://www.omdbapi.com/?s=${tittle}&apikey=a9832fb4`)
        .then(success => success.json())
        .then(movies => {
          allFilms = Array.from(movies.Search)
          for (let filmA of allFilms) {

            let film = document.createElement('DIV')
            film.setAttribute('class', "film")
            film.setAttribute('dataImdb', filmA.imdbID)
            let posterF = document.createElement('IMG')
            posterF.setAttribute('class', "film__poster")
            posterF.setAttribute('src', filmA.Poster)
            let filmInfo = document.createElement('DIV')
            filmInfo.setAttribute('class', "film__info")
            let tittle = document.createElement('H2')
            tittle.textContent = filmA.Title
            tittle.setAttribute('class', "film__tittle")
            let year = document.createElement('P')
            year.textContent = filmA.Year
            year.setAttribute('class', "film__year")
            let fav = document.createElement('I')
            // far vacia fas rellena
            fav.setAttribute('class', "far fa-star fa-3x")

            // jerarquia
            film.appendChild(posterF)
            film.appendChild(filmInfo)
            film.appendChild(fav)
            filmInfo.appendChild(tittle)
            filmInfo.appendChild(year)
            fragment.appendChild(film)
            filmContainer.appendChild(fragment)
            // comprobar si la pelicula en cuestion ya esta en la lista de favoritos
            let favF = favFilms.indexOf(filmA.imdbID)
            if (favF != -1) {
              fav.classList.replace('far', 'fas')
            }
          }
        })
        .catch(error => console.log(error))
    }
  })
}

if (filmContainer) {
  filmContainer.addEventListener('click', (e) => {
    let indexFilm = 0
    if (e.target.tagName == 'I') {
      e.target.classList.contains('far') ?
        (
          e.target.classList.replace('far', 'fas'),
          // añadir a fav
          favFilms.push(e.target.parentNode.attributes[1].value),
          updateFavFilm()
        )
        :
        (
          e.target.classList.replace('fas', 'far'),
          favFilms.splice(favFilms.indexOf(e.target.parentNode.attributes[1].value), 1),
          updateFavFilm()
        )
    }
    console.log('lista de favoritas por id:' + favFilms)
    // va a la pagina de la pelicula especifica
    if (e.target.tagName == 'IMG') {
      theFilm(e.target.parentNode.attributes[1].value)
    }
  })
}
// Muestra solo la pelicula
const theFilm = (id) => {
  filmContainer.classList.add('--oneFilm')
  filmContainer.innerHTML = ''
  fetch(`http://www.omdbapi.com/?i=${id}&apikey=a9832fb4`)
    .then(success => success.json())
    .then(movie => {
      console.log(movie)
      let film = document.createElement('DIV')
      film.setAttribute('class', "film")
      film.setAttribute('dataImdb', movie.imdbID)
      let posterF = document.createElement('IMG')
      posterF.setAttribute('class', "film__poster")
      posterF.setAttribute('src', movie.Poster)
      let filmInfo = document.createElement('DIV')
      filmInfo.setAttribute('class', "film__info")
      let tittle = document.createElement('H2')
      tittle.textContent = movie.Title
      tittle.setAttribute('class', "film__tittle")
      let year = document.createElement('P')
      year.textContent = movie.Year
      year.setAttribute('class', "film__year")
      let fav = document.createElement('I')
      // far vacia fas rellena
      fav.setAttribute('class', "far fa-star fa-3x")

      // jerarquia
      film.appendChild(posterF)
      film.appendChild(filmInfo)
      film.appendChild(fav)
      filmInfo.appendChild(tittle)
      filmInfo.appendChild(year)
      fragment.appendChild(film)
      filmContainer.appendChild(fragment)
      // comprobar si la pelicula en cuestion ya esta en la lista de favoritos
      let favU = favFilms.indexOf(id)
      favU != -1 ? (
        fav.classList.replace('far', 'fas'),
        updateFavFilm()
      )
        : (
          fav.classList.replace('fas', 'far'),
          updateFavFilm()
        )
    })

    .catch(error => console.log(error))

}

const updateFavFilm = () => {
  // actualiza favs en localHost
  objetoUsuario.peliculas = favFilms
  localStorage.setItem(userSession, JSON.stringify(objetoUsuario))
}
