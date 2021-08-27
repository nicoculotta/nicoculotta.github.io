var smoothScroll = new scrolltoanchor({
    duration: 1000,
    offset: 70,
});

window.sr = ScrollReveal( { duration: 1500, reset: true });
sr.reveal('.hero__title', { distance: '50px', origin: 'bottom'});
sr.reveal('.hero__description', { distance: '50px', origin: 'bottom', delay: 200});
sr.reveal('.button-scroll', { distance: '50px', origin: 'bottom', delay: 400});


sr.reveal('.card-scroll-1', { distance: '50px', origin: 'bottom', cleanup: true});
sr.reveal('.card-scroll-2', { distance: '50px', origin: 'bottom', delay: 200});

sr.reveal('.clients__logos', { distance: '20px', origin: 'bottom'});

sr.reveal('.grid__card-1', { scale: 0.85 , delay: 300 });
sr.reveal('.grid__card-2', { scale: 0.85 , delay: 300 });
sr.reveal('.grid__card-3', { scale: 0.85 , delay: 300 });
sr.reveal('.grid__card-4', { scale: 0.85 , delay: 300 });
sr.reveal('.grid__card-5', { scale: 0.85 , delay: 300 });
sr.reveal('.grid__card-6', { scale: 0.85 , delay: 300 });

sr.reveal('.swiper__pagination--wrapper', { distance: "50px" , origin: "bottom" });
sr.reveal('.swiper-container', { distance: "50px" , origin: "bottom" });

sr.reveal('.subscribe-scroll', { distance: "100px" , origin: "top" });

sr.reveal('.contact-scroll', { distance: "100px" , origin: "bottom" });


let menu = document.querySelector('.nav-bg');

window.addEventListener( "scroll", (e) => {
    e.preventDefault();
    window.pageYOffset > 60 ? 
        menu.style.cssText = "background-color: #FFF; box-shadow: 0 10px 15px rgba(0,0,0,0.04);"
        : 
        menu.style.cssText = "background-color: transparent; box-shadow:none;"
    
})




