$(document).ready( () => {
    /* ------------------------------ DOM ELEMENTS ------------------------------ */

    const menuIcon = $('.icon-menu');
    const menuLinks = $('.link-menu');
    const scrollToBtn = $('.btn__scroll');

    /* ----------------------------- MENU ANIMATION ----------------------------- */

    const menuAnimation = gsap.timeline( {paused: true} );

    menuAnimation.to('.overlay-menu--grey', {duration: 1, ease: 'power4' , y: 0})
    menuAnimation.to('.overlay-menu', {duration: .8, ease: 'power4' , y: 0}, "-=0.7")
    menuAnimation.to('.link-menu', {duration: .5 , y: 0, opacity: 1 , ease: 'power4' ,  stagger: .2}, "-=0.5")


    let isPlay = false;
    menuIcon.click( () => {

        menuIcon.toggleClass('open')

        if (!isPlay) {
            isPlay = true;
            menuAnimation.play();

        } else {
            isPlay = false;
            menuAnimation.reverse()
        }
    })

    menuLinks.click( () => {
        menuIcon.toggleClass('open')
        isPlay = false;
        menuAnimation.reverse()
    })


    /* ----------------------------- HERO ANIMATIONS ---------------------------- */

    const heroTl = gsap.timeline();

    heroTl.to('.hero__title--text span', { duration: 2, ease: 'power4', y: 0, rotation: 0, stagger: .2}  )
    heroTl.fromTo(['.hero__content--social .subtitle', '.hero__content--intro .subtitle'], { y: 50, opacity: 0 }, {y: 0 , opacity: 1 ,duration: .5, stagger: .2}, "-=2")
    heroTl.fromTo('.social--icons a', { y: 30, opacity: 0 }, {y: 0 , opacity: 1, duration: .5 , stagger: .1 }, "-=2")
    heroTl.fromTo('.hero__content--intro .paragraph', { y: 30, opacity: 0 }, {y: 0 , opacity: 1, duration: .5 }, "-=1.5")




    /* --------------------------- PROJECTS ANIMATIONS -------------------------- */

    const projectTl = gsap.timeline({
        scrollTrigger: {
            trigger: ".projects",
            start: '200px bottom',
            toggleActions: 'restart play restart play'
        },
        ease: 'power4'
    });


    projectTl.to('.projects .shadow--title',{x: 0, opacity: 0.5})
    projectTl.fromTo('.card', {scale: 0.8, transformOrigin:"center"},{stagger: .1, scale: 1},"-=.5")


    /* --------------------------- ABOUT ANIMATIONS -------------------------- */

    const aboutTl = gsap.timeline({
        scrollTrigger: {
            trigger: ".about",
            start: "300px bottom",
            toggleActions: 'restart play restart play'
        },
        ease: 'power4'
    });


    aboutTl.to('.about .shadow--title', {x: 0, opacity: 0.3})
    aboutTl.fromTo('.about__resume', {y: 200},{stagger: .1, y: 0})
    aboutTl.fromTo('.about__text p', {y: 100, opacity: 0},{stagger: .2, y: 0, opacity: 1},"-=.5")

    const skillsTl = gsap.timeline({
        scrollTrigger: {
            trigger: ".skills",
            toggleActions: 'restart play restart play'
        },
        ease: 'power4'
    });


    skillsTl.fromTo('.skills--title', {x: -100, opacity: 0},{ x: 0, opacity: 1})
    skillsTl.fromTo('.box', {scale: 0.8},{stagger: .1, scale: 1},"-=.5")


    /* --------------------------- CONTACT ME  -------------------------- */

    const contactTl = gsap.timeline({
        scrollTrigger: {
            trigger: ".contact--form",
            toggleActions: 'restart play restart play'
        },
        ease: 'power4'
    });


    contactTl.fromTo('.contact--form__wrapper h2', {x: -100, opacity: 0},{x: 0, opacity: 1})
    contactTl.fromTo('input', {y: 70, opacity: 0},{y: 0, opacity: 1},"-=.5")
    contactTl.fromTo('textarea', {y: 70, opacity: 0},{y: 0, opacity: 1},"-=.2")
    contactTl.fromTo('.btn-submit', {y: 70, opacity: 0},{y: 0, opacity: 1},"-=.2")
    contactTl.fromTo('.aside--title', {y: 50, opacity: 0},{y: 0, opacity: 1},"-=.2")
    contactTl.fromTo('.aside--form p', {y: 50, opacity: 0},{y: 0, opacity: 1},"-=.2")


/* ------------------------------ SCROLL TO TOP ----------------------------- */

    const scrollBtnTl = gsap.timeline({ paused: true })

    scrollBtnTl.fromTo('.btn__scroll', { y: 200, rotate: 180}, { y: 0, rotate: 180})
    
    $(window).scroll( () => {
    
        if ( $(this).scrollTop() > 200 && !menuIcon.hasClass('open')){
            scrollBtnTl.play()
        } else {
            scrollBtnTl.reverse()
        }
    })

    scrollToBtn.click( () => {
        gsap.to(window, {duration: 0.1, scrollTo: 0, ease: "power4"});
    })


/* ----------------------------- FORM VALIDATION ---------------------------- */

    const email = $('input[type="email"]');
    const message = $('textarea[name="message"]');
    const submitButton = $('.btn-submit button');
    const error = $('.error');

    submitButton.on('click', () => {
        error.removeClass('visible');
        let hasError = false;

        let emailVal = email.val();
        let messageVal = message.val();


        if ( emailVal == '' ) {
            error.addClass('visible');
            error.text("Don't forget your address");
            submitButton.css({'background-color': 'var(--error)', 'border-color': 'var(--error)'})
            hasError = true;
        }

        if ( messageVal == '' ) {
            error.addClass('visible');
            error.text('Please write a message');
            hasError = true;
        }

        if ( messageVal == '' &&  emailVal == '' ) {
            error.addClass('visible');
            error.text('Complete the form to send me a message');
            hasError = true;
        }

        if (hasError) {
            return false;
        }

    })









}) /* END JQUERY */




