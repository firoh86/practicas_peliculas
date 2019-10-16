"use strict";function _classCallCheck(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}var login=document.getElementById("loginButton"),loginModal=document.getElementById("loginModal"),modalBox=document.getElementById("loginBox"),loginExit=document.getElementById("loginExit"),formLogin=document.getElementById("form-login"),user=document.getElementById("user"),pass=document.getElementById("password"),session=document.getElementById("sessionInit"),Usuario=function e(t,a,n){_classCallCheck(this,e),this.user=t,this.password=a,this.peliculas=n};login&&login.addEventListener("click",function(){loginModal.classList.contains("show--bg")||(modalBox.classList.add("show--modal"),loginModal.classList.add("show--bg"))}),loginExit&&loginExit.addEventListener("click",function(){loginModal.classList.contains("show--bg")&&(modalBox.classList.remove("show--modal"),loginModal.classList.remove("show--bg"))}),formLogin&&formLogin.addEventListener("submit",function(e){e.preventDefault()}),session&&session.addEventListener("click",function(){""!=user.value.trim()&&""!=pass.value.trim()&&check(user.value.trim(),pass.value.trim())});var check=function(e,t){if(null!=localStorage.getItem(e)){JSON.parse(localStorage.getItem(e)).password==t&&(console.log("Se ha logeado el usuario: "+e),sessionStorage.clear(),sessionStorage.setItem("usuario",e),window.location.href="films.html")}else{var a=new Usuario(e,t,"");localStorage.setItem(e,JSON.stringify(a)),sessionStorage.clear(),sessionStorage.setItem("usuario",e),console.log("Se ha creado un nuevo usuario con user:"+e),window.location.href="films.html"}},filmContainer=document.getElementById("films-container"),searchField=document.getElementById("search-field"),searchButton=document.getElementById("search-button"),userSession="",favFilms=new Array,allFilms=new Array,fragment=document.createDocumentFragment();userSession=sessionStorage.getItem("usuario");var objetoUsuario=JSON.parse(localStorage.getItem(userSession)),filmsFav=Array.from(objetoUsuario.peliculas);favFilms=filmsFav,searchButton&&searchButton.addEventListener("click",function(e){e.preventDefault();var t=searchField.value.trim();console.log(t),""!=t&&(filmContainer.classList.contains("--oneFilm")&&filmContainer.classList.remove("--oneFilm"),filmContainer.innerHTML="",fetch("http://www.omdbapi.com/?s=".concat(t,"&apikey=a9832fb4")).then(function(e){return e.json()}).then(function(e){allFilms=Array.from(e.Search);var t=!0,a=!1,n=void 0;try{for(var s,i=allFilms[Symbol.iterator]();!(t=(s=i.next()).done);t=!0){var o=s.value,l=document.createElement("DIV");l.setAttribute("class","film"),l.setAttribute("dataImdb",o.imdbID);var r=document.createElement("IMG");r.setAttribute("class","film__poster"),r.setAttribute("src",o.Poster);var c=document.createElement("DIV");c.setAttribute("class","film__info");var m=document.createElement("H2");m.textContent=o.Title,m.setAttribute("class","film__tittle");var d=document.createElement("P");d.textContent=o.Year,d.setAttribute("class","film__year");var u=document.createElement("I");u.setAttribute("class","far fa-star fa-3x"),l.appendChild(r),l.appendChild(c),l.appendChild(u),c.appendChild(m),c.appendChild(d),fragment.appendChild(l),filmContainer.appendChild(fragment),-1!=favFilms.indexOf(o.imdbID)&&u.classList.replace("far","fas")}}catch(e){a=!0,n=e}finally{try{t||null==i.return||i.return()}finally{if(a)throw n}}}).catch(function(e){return console.log(e)}))}),filmContainer&&filmContainer.addEventListener("click",function(e){"I"==e.target.tagName&&(e.target.classList.contains("far")?(e.target.classList.replace("far","fas"),favFilms.push(e.target.parentNode.attributes[1].value)):(e.target.classList.replace("fas","far"),favFilms.splice(favFilms.indexOf(e.target.parentNode.attributes[1].value),1)),updateFavFilm()),console.log("lista de favoritas por id:"+favFilms),"IMG"==e.target.tagName&&theFilm(e.target.parentNode.attributes[1].value)});var theFilm=function(l){filmContainer.classList.add("--oneFilm"),filmContainer.innerHTML="",fetch("http://www.omdbapi.com/?i=".concat(l,"&apikey=a9832fb4")).then(function(e){return e.json()}).then(function(e){console.log(e);var t=document.createElement("DIV");t.setAttribute("class","film"),t.setAttribute("dataImdb",e.imdbID);var a=document.createElement("IMG");a.setAttribute("class","film__poster"),a.setAttribute("src",e.Poster);var n=document.createElement("DIV");n.setAttribute("class","film__info");var s=document.createElement("H2");s.textContent=e.Title,s.setAttribute("class","film__tittle");var i=document.createElement("P");i.textContent=e.Year,i.setAttribute("class","film__year");var o=document.createElement("I");o.setAttribute("class","far fa-star fa-3x"),t.appendChild(a),t.appendChild(n),t.appendChild(o),n.appendChild(s),n.appendChild(i),fragment.appendChild(t),filmContainer.appendChild(fragment),-1!=favFilms.indexOf(l)?o.classList.replace("far","fas"):o.classList.replace("fas","far"),updateFavFilm()}).catch(function(e){return console.log(e)})},updateFavFilm=function(){objetoUsuario.peliculas=favFilms,localStorage.setItem(userSession,JSON.stringify(objetoUsuario))};