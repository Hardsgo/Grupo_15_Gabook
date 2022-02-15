window.addEventListener("load", function () {
  /////------login-------------
  // Seleccionando el input de correo y el msj de error
  let inputEmaillogin = document.querySelector(".inputEmaillogin");
  let emailErrorText = document.querySelector(".email-error-text");
  //Validando correo
  let validEmail = /^[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+\.[a-zA-Z]+$/;

 

  inputEmaillogin.addEventListener("keyup", function(){
    if (!inputEmaillogin.value.match(validEmail)) {
      inputEmaillogin.classList.remove("input-valid");
      inputEmaillogin.classList.add("input-invalid");
      emailErrorText.style.display = "inline";
    } else {
      inputEmaillogin.classList.remove("input-invalid");
      inputEmaillogin.classList.add("input-valid");
      emailErrorText.style.display = "none";
    }
  });

  // Seleccionando el input de password y el msj de error
  let inputPasswordLogin = document.querySelector("#login-passwd");
  let passwordErrorText = document.querySelector(".password-error-text");
  //Validando Password
  inputPasswordLogin.addEventListener("blur", function () {
    if (!inputPasswordLogin.value) {
      inputPasswordLogin.classList.remove("input-valid");
      inputPasswordLogin.classList.add("input-invalid");
      passwordErrorText.style.display = "inline";
    } else {
      inputPasswordLogin.classList.remove("input-invalid");
      inputPasswordLogin.classList.add("input-valid");
      inputPasswordLogin.style.backgroundColor = "white";
      passwordErrorText.style.display = "none";
    }
  });

  // Seleccionando el submit y validando nuevamente
  let loginForm = document.querySelector(".loginForm");
  let validInputs = document.querySelectorAll(".input-valid");
  console.log(validInputs.length);
  loginForm.addEventListener("submit", function (event) {
    let validInputs = document.querySelectorAll(".input-valid");
    if (validInputs.length != 2) {
      if (!inputEmaillogin.classList.contains("input-valid")) {
        emailErrorText.style.display = "inline";
      }
      if (!inputPasswordLogin.classList.contains("input-valid")) {
        passwordErrorText.style.display = "inline";
      }
      event.preventDefault();
    }
  });
});


