'use strict';
console.log(`готовы 2 страницы:
main: 60
pets:40
Итого: 100`);

const html = document.querySelector('html');
const body = document.querySelector('.body');
const overlay = document.querySelector('.overlay');
const burgerIco = document.querySelector('.header__burger');
const nav = document.querySelector('.header__navigation');
const navList = document.querySelector('.navigation__list');
const sliderBtnRight = document.querySelector('.slider__btn--right')
const sliderBtnLeft = document.querySelector('.slider__btn--left')


//const navLink = document.querySelectorAll('.navigation__list-link');

/*BURGER****************************************/
const openMenu = function (e) {
    const target = e.target;
    if (target.classList.contains('header__burger') || target.closest('div > span')) {
        html.classList.toggle('body-scroll')
        overlay.classList.toggle("active")
        burgerIco.classList.toggle("active")
        nav.classList.toggle("active_navigation")
        navList.classList.toggle("active")
        nav.classList.toggle("close_navigation")
    }
}
const closeMenu = function (e) {
    html.classList.remove('body-scroll')
    overlay.classList.remove("active")
    burgerIco.classList.remove("active")
    nav.classList.remove("active_navigation")
    navList.classList.remove("active")
    nav.classList.add("close_navigation")
    
}

burgerIco.addEventListener('click', openMenu);
document.addEventListener('click', (e) =>{
    const target = e.target;
    console.log(target);
    if (!target.classList.contains('header__burger') &&
        !target.closest('div > span') ||
        target.closest('.navigation__list')){
            closeMenu();
        }
});

/*SLIDER****************************************/
