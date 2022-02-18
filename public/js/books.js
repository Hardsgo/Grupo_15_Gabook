const expresiones = {
  isbn: /^[\d]+$/,
  title: /^[a-z0-9áéíóúñü\s]{5,}/i, //Letras, puntos, comas y espacios mayores a 5 caracteres
  author: /^[a-záéíóúñü ]+$/i,
  editorial: /^[a-záéíóúñü ]+$/i,
  year: /^(\d){4}$/,
  price: /^[0-9]+$/,
  discount: /^[0-9]+$/,
  description: /^([a-z0-9áéíóúñü¿]\.{0,3}\,? ?){20,}$/im,
};

const productsForm = document.querySelector("#product-form");
const inputText = document.querySelectorAll(".input-text");
console.log(inputText);

const campos = {
  isbn: inputText[0].value.length == 0 ? false : true,
  title: inputText[1].value.length == 0 ? false : true,
  author: inputText[2].value.length == 0 ? false : true,
  editorial: inputText[3].value.length == 0 ? false : true,
  year: inputText[4].value.length == 0 ? false : true,
  price: inputText[5].value.length == 0 ? false : true,
  discount: inputText[6].value.length == 0 ? false : true,
  description: inputText[7].value.length == 0 ? false : true,
  file: inputText[8].value.length == 0 ? false : true,
};
const validarCampo = (expresion, input, campo) => {
  // alert(input.value)
  // console.log(input.value);
  if (expresion.test(input.value)) {
    document.getElementById(campo).classList.remove("input-invalid");
    document.getElementById(campo).classList.add("input-valid");
    document.getElementById(`warning-text-${campo}`).classList.add("message");
    document
      .getElementById(`warning-text-${campo}`)
      .classList.remove("error-form");
    campos[campo] = true;
  } else {
    document.getElementById(campo).classList.remove("input-valid");
    document.getElementById(campo).classList.add("input-invalid");
    document
      .getElementById(`warning-text-${campo}`)
      .classList.remove("message");
    document
      .getElementById(`warning-text-${campo}`)
      .classList.add("error-form");
    campos[campo] = false;
  }
};

const validarForm = (e) => {
  // console.log(e.target.value);
  switch (e.target.name) {
    case "isbn":
      validarCampo(expresiones.isbn, e.target, "isbn");
      break;
    case "title":
      validarCampo(expresiones.title, e.target, "title");
      break;
    case "author":
      validarCampo(expresiones.author, e.target, "author");
      break;
    case "editorial":
      validarCampo(expresiones.editorial, e.target, "editorial");
      break;
    case "year":
      validarCampo(expresiones.year, e.target, "year");
      break;
    case "description":
      validarCampo(expresiones.description, e.target, "description");
      break;
    case "price":
      validarCampo(expresiones.price, e.target, "price");
      break;
    case "discount":
      validarCampo(expresiones.discount, e.target, "discount");
      break;
  }
};

inputText.forEach((input) => {
  input.addEventListener("keyup", validarForm);
});

let inputImage = document.getElementById("file");
let editBookImage = document.getElementById("edit-book-img");


if (editBookImage) {
  campos.file = true;
}

inputImage.addEventListener("change", function () {
  if (inputImage.value.length > 0) {
    let validImage = /^.+\.(?:jpg|gif|png|jpeg)$/;
    if (!inputImage.value.match(validImage)) {
      inputImage.classList.remove("input-valid");
      inputImage.classList.add("input-invalid");
      campos.file = false;
    } else {
      inputImage.classList.remove("input-invalid");
      inputImage.classList.add("input-valid");
      campos.file = true;
    }
  }
});


let editBookGenre = document.getElementById("edit-book-genres-select");
console.log(editBookGenre)

inputText.forEach((input) => {
  productsForm.addEventListener("submit", validarForm);
});

productsForm.addEventListener("submit", (e) => {
  console.log(campos);

  if (
    !(
      campos.isbn &&
      campos.title &&
      campos.author &&
      campos.editorial &&
      campos.description &&
      campos.year &&
      campos.price &&
      campos.discount &&
      campos.file
    )
  ) {
    e.preventDefault();
  }
});
