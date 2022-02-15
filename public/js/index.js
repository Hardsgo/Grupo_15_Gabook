window.addEventListener("load", function () {
  console.log("hola"); //probar la vinculacion

  // Selecinando el input del nombre
  let nameErrorText = document.querySelector(".name-error-text");
  let inputName = document.querySelector(".inputName");
  console.log(inputName);
  //Validando el nombre > 3 caracteres cada vez que se incluye un nuevo cracter en el input
  inputName.addEventListener("keyup", function () {
    if (inputName.value.length < 3) {
      inputName.classList.remove("input-valid");
      inputName.classList.add("input-invalid");
      nameErrorText.style.display = "inline";
    } else {
      inputName.classList.remove("input-invalid");
      inputName.classList.add("input-valid");
      nameErrorText.style.display = "none";
    }
  });

  // Seleccionando el input de password y el msj de error
  let inputPassword = document.querySelector("#login-passwd");
  let passwordErrorText = document.querySelector(".password-error-text");
  //Validando Password
  let validPassword =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!"#$%&/()=?¡])[a-zA-Z0-9!"#$%&/()=?¡]{8,}$/;
  inputPassword.addEventListener("keyup", function () {
    if (!inputPassword.value.match(validPassword)) {
      inputPassword.classList.remove("input-valid");
      inputPassword.classList.add("input-invalid");
      passwordErrorText.style.display = "inline";
    } else {
      inputPassword.classList.remove("input-invalid");
      inputPassword.classList.add("input-valid");
      passwordErrorText.style.display = "none";
    }
  });

  // Seleccionando el input de correo y el msj de error
  let inputEmail = document.querySelector(".inputEmail");
  let emailErrorText = document.querySelector(".email-error-text");
  //Validando correo
  let validEmail = /^[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+\.[a-zA-Z]+$/;
  inputEmail.addEventListener("keyup", function () {
    if (!inputEmail.value.match(validEmail)) {
      inputEmail.classList.remove("input-valid");
      inputEmail.classList.add("input-invalid");
      emailErrorText.style.display = "inline";
    } else {
      inputEmail.classList.remove("input-invalid");
      inputEmail.classList.add("input-valid");
      emailErrorText.style.display = "none";
    }
  });

  // Seleccionando el input de imagen y el msj de error
  let inputImage = document.getElementById("login-image");
  console.log(inputImage);
  let imageErrorText = document.querySelector(".image-error-text");
  //Validando formato Imagen
  let validImage = /^.+\.(?:jpg|gif|png)$/;
  inputImage.addEventListener("change", function () {
    console.log(1);
    console.log(inputImage.value);
    if (!inputImage.value.match(validImage)) {
      inputImage.classList.remove("input-valid");
      inputImage.classList.add("input-invalid");
      imageErrorText.style.display = "inline";
    } else {
      inputImage.classList.remove("input-invalid");
      inputImage.classList.add("input-valid");
      imageErrorText.style.display = "none";
    }
  });

  let signInForm = document.querySelector(".signInForm");
  console.log(signInForm);
  let validInputs = document.querySelectorAll(".input-valid");
  console.log(validInputs.length);
  signInForm.addEventListener("submit", function (event) {
    let validInputs = document.querySelectorAll(".input-valid");
    if (validInputs.length != 4) {
      nameErrorText.style.display = "inline";
      emailErrorText.style.display = "inline";
      passwordErrorText.style.display = "inline";
      imageErrorText.style.display = "inline";
      event.preventDefault();
    }
  });


});
