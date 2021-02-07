/* TOGGLE MENU */

const BUTTON_MENU = document.querySelector('.menu--mobile');
const BUTTON_MENU_CLOSE = document.querySelector('.icon-close');
const MENU_MOBILE = document.querySelector('.menu__mobile')

function toggleMenu(){
    MENU_MOBILE.classList.toggle('open')
}

BUTTON_MENU.addEventListener('click', toggleMenu)
BUTTON_MENU_CLOSE.addEventListener('click', toggleMenu)


/* SCROLL MENU */

const MENU_SCROLL = document.querySelector('.header-on-scroll');

let prevScrollpos = window.pageYOffset + 150;
console.log(prevScrollpos)

window.onscroll = function() {
        let currentScrollPos = window.pageYOffset;

        if (prevScrollpos > currentScrollPos) {
            MENU_SCROLL.classList.remove('show');
        } else {
            MENU_SCROLL.classList.add('show');
        }
        prevScrollpos = currentScrollPos;
    }