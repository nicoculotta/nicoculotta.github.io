let imgMobile = $('.imgMobile')

if ($(window).width() < 768) {
    imgMobile.attr('src', 'images/img_telefono-mobile.png')
}

$(window).resize(function(){
    if ( $(this).width() < 768 ){
        imgMobile.attr('src', 'images/img_telefono-mobile.png')
    }
    else {
        imgMobile.attr('src', 'images/img_telefono-desktop.png')
    }
})