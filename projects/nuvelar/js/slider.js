var slides = document.getElementsByClassName('slider__content')
var arrSlides = [...slides]


var swiper = new Swiper(".mySwiper", {
    pagination: {
        el: ".swiper-pagination",
        clickable: true,
    }
});

var swiperSlidesArr = swiper.slides

swiper.on('slideChange', function() {

    var activeSlide = swiper.activeIndex;
    
    arrSlides.forEach( item => {
        item.classList.remove('active');
    });
    
    arrSlides[activeSlide].classList.add('active');
    
})



