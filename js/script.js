
////////////////////////Открытие главного меню
var navMain = document.querySelector('.main-nav');
var navToggle = document.querySelector('.main-nav__toggle');

navMain.classList.remove('main-nav--nojs');

navToggle.addEventListener('click', function() {
  if (navMain.classList.contains('main-nav--closed')) {
    navMain.classList.remove('main-nav--closed');
    navMain.classList.add('main-nav--opened');
  } else {
    navMain.classList.add('main-nav--closed');
    navMain.classList.remove('main-nav--opened');
  }
});
////////////////////////////////////////////////////

////////////////////////Открытие формы входа
var link = document.querySelector(".main-nav__user-login");
var popup = document.querySelector(".modal-login");
var login = popup.querySelector("[name=login]");
var password = popup.querySelector("[name=password]");
var form = popup.querySelector("form");
var close = document.querySelector(".modal-login__btn-closed");
var storage = localStorage.getItem("login");

link.addEventListener("click", function(event) {
  event.preventDefault();
  popup.classList.remove("modal-login--hide");
  popup.classList.add("modal-login--show");
  login.focus();
  if (storage) {
    login.value = storage;
    password.focus();
  } else {
    login.focus();
  }
});

close.addEventListener("click", function(event) {
  event.preventDefault();
  popup.classList.remove("modal-login--show");
  popup.classList.remove("modal-login--error");
  popup.classList.add("modal-login--hide");
  popup.classList.remove("modal-login--static");
});

/////////////////////////
// form.addEventListener("submit", function(event) {
//   if (!login.value || !password.value) {
//     event.preventDefault();
//     popup.classList.remove("modal-login--error");
//     var pew = setTimeout(function(){
//       popup.classList.add("modal-login--error");
//       clearTimeout(pew);
//     }, 50);
//   } else {
//       localStorage.setItem("login", login.value);
//   }
// });
////////////////////////////

form.addEventListener("submit", function(event) {
  if (!login.value || !password.value) {
    event.preventDefault();
    popup.classList.add("modal-login--error");
    popup.classList.add("modal-login--static");
    var pew = setTimeout(function(){
          popup.classList.remove("modal-login--hide");
          popup.classList.remove("modal-login--show");
          popup.classList.remove("modal-login--error");
          clearTimeout(pew);
    }, 600);
  } else {
      localStorage.setItem("login", login.value);
  }
});

// Начальный код
// form.addEventListener("submit", function(event) {
//   if (!login.value || !password.value) {
//     event.preventDefault();
//     popup.classList.add("modal-login--error");
//   } else {
//       localStorage.setItem("login", login.value);
//   }
// });

window.addEventListener("keydown", function(event) {
  if (event.keyCode === 27) {
    // if (popup.classList.contains("modal-login--show")) {
      popup.classList.remove("modal-login--show");
      popup.classList.remove("modal-login--error");
      popup.classList.add("modal-login--hide");
      popup.classList.remove("modal-login--static");
    // }
  }
});
////////////////////////////////////////////////////
