window.addEventListener("load", function () {
  /////------login-------------
  // Seleccionando el input de correo y el msj de error
  let inputEmaillogin = document.querySelector(".inputEmaillogin");
  let emailErrorText = document.querySelector(".email-error-text");
  let passwordErrorText = document.querySelector(".password-error-text");
  //Validando correo
  let validEmail = /^[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+\.[a-zA-Z]+$/;

  let emailValidation = () =>{
    if (!inputEmaillogin.value.match(validEmail)) {
      inputEmaillogin.classList.remove("input-valid");
      inputEmaillogin.classList.add("input-invalid");
      emailErrorText.style.display = "inline";
    } else {
      inputEmaillogin.classList.remove("input-invalid");
      inputEmaillogin.classList.add("input-valid");
      emailErrorText.style.display = "none";
    }
  }
  inputEmaillogin.addEventListener("keyup", emailValidation);

  // Seleccionando el submit y validando nuevamente
  let loginPassword = document.querySelector("#login-passwd");
  let loginForm = document.querySelector(".loginForm");
  loginForm.addEventListener("submit", function (event) {
    emailValidation()
    if (!inputEmaillogin.classList.contains("input-valid")|| !loginPassword.value.length >0) {
      if (!inputEmaillogin.classList.contains("input-valid")){
        emailErrorText.style.display = "inline";
      }
      if (!loginPassword.value.length >0){
        passwordErrorText.style.display = "inline";
      }
      event.preventDefault();
    }
  });
});
