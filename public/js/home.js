window.addEventListener("load", function () {
  let headerUserImage = document.querySelector(".header-login-image");
  let userMenu = document.querySelector("#header-user-menu");
  headerUserImage.addEventListener("click", function () {
    if (userMenu.style.display == "block") {
      userMenu.style.display = "none";
    } else {
      userMenu.style.display = "block";
    }
  });
});
