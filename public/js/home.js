window.addEventListener('load',function(){
    let headerUserImage = document.querySelector('.header-login-image')
    let userMenu = document.querySelector('#header-user-menu')
    console.log
    headerUserImage.addEventListener('click',function(){
        userMenu.style.display = "block"
    })
    userMenu.addEventListener('mouseout',function(){
        userMenu.style.display = "none"
    })

})