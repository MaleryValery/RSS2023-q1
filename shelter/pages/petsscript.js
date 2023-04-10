'use strict';
const main = document.querySelector('.main');
const body = document.querySelector('.body');
const overlay = document.querySelector('.overlay');
const burgerIco = document.querySelector('.header__burger');
const nav = document.querySelector('.header__navigation');
const navList = document.querySelector('.navigation__list');

const paginBtnNextNext = document.querySelector('.slider__btn--next-next');
const paginBtnNext = document.querySelector('.slider__btn--next');
const paginBtnPrevPrev = document.querySelector('.slider__btn--pre-prev');
const paginBtnPrev = document.querySelector('.slider__btn--prev');
const paginBtnCurr = document.querySelector('.slider__btn--cur');
const paginControls = document.querySelector('.slider__pets--nav')
const slider = document.querySelector('.slider__card-conteiner');
const sliderPets = document.querySelector('.slider__pets');

const popup = document.querySelector('.popup');


/*BURGER****************************************/
const openMenu = function (e) {
    const target = e.target;
    if (target.classList.contains('header__burger') || target.closest('div > span')) {
        main.classList.toggle('body-scroll')
        overlay.classList.toggle("active")
        burgerIco.classList.toggle("active")
        nav.classList.toggle("active_navigation")
        navList.classList.toggle("active")
        nav.classList.toggle("close_navigation")
    }
}
const closeMenu = function (e) {
    main.classList.remove('body-scroll')
    overlay.classList.remove("active")
    burgerIco.classList.remove("active")
    nav.classList.remove("active_navigation")
    navList.classList.remove("active")
    nav.classList.add("close_navigation")
}

burgerIco.addEventListener('click', openMenu);
overlay.addEventListener('click', closeMenu);
navList.addEventListener('click', (e)=>{
    if(e.target.classList.contains('navigation__list-link')){
        closeMenu()
    }
});
//nav.addEventListener('click', closeMenu);


//MODAL////////////////////////////////////
const petList = [{
        "id": "card-01",
        "name": "Katrine",
        "img": "../img/modal/katrine.png",
        "type": "Cat",
        "breed": "British Shorthair",
        "description": "Katrine is a beautiful girl. She is as soft as the finest velvet with a thick lush fur. Will love you until the last breath she takes as long as you are the one. She is picky about her affection. She loves cuddles and to stretch into your hands for a deeper relaxations.",
        "age": "6 months",
        "inoculations": ["panleukopenia"],
        "diseases": ["none"],
        "parasites": ["none"]
    },
    {
        "id": "card-02",
        "name": "Jennifer",
        "img": "../img/modal/jennifer.png",
        "type": "Dog",
        "breed": "Labrador",
        "description": "Jennifer is a sweet 2 months old Labrador that is patiently waiting to find a new forever home. This girl really enjoys being able to go outside to run and play, but won't hesitate to play up a storm in the house if she has all of her favorite toys.",
        "age": "2 months",
        "inoculations": ["none"],
        "diseases": ["none"],
        "parasites": ["none"]
    },
    {
        "id": "card-03",
        "name": "Woody",
        "img": "../img/modal/woody.png",
        "type": "Dog",
        "breed": "Golden Retriever",
        "description": "Woody is a handsome 3 1/2 year old boy. Woody does know basic commands and is a smart pup. Since he is on the stronger side, he will learn a lot from your training. Woody will be happier when he finds a new family that can spend a lot of time with him.",
        "age": "3 years 6 months",
        "inoculations": ["adenovirus", "distemper"],
        "diseases": ["right back leg mobility reduced"],
        "parasites": ["none"]
    },
    {
        "id": "card-04",
        "name": "Sophia",
        "img": "../img/modal/sophia.png",
        "type": "Dog",
        "breed": "Shih tzu",
        "description": "Sophia here and I'm looking for my forever home to live out the best years of my life. I am full of energy. Everyday I'm learning new things, like how to walk on a leash, go potty outside, bark and play with toys and I still need some practice.",
        "age": "1 month",
        "inoculations": ["parvovirus"],
        "diseases": ["none"],
        "parasites": ["none"]
    },
    {
        "id": "card-05",
        "name": "Timmy",
        "img": "../img/modal/timmy.png",
        "type": "Cat",
        "breed": "British Shorthair",
        "description": "Timmy is an adorable grey british shorthair male. He loves to play and snuggle. He is neutered and up to date on age appropriate vaccinations. He can be chatty and enjoys being held. Timmy has a lot to say and wants a person to share his thoughts with.",
        "age": "2 years 3 months",
        "inoculations": ["calicivirus", "viral rhinotracheitis"],
        "diseases": ["kidney stones"],
        "parasites": ["none"]
    },
    {
        "id": "card-06",
        "name": "Charly",
        "img": "../img/modal/charly.png",
        "type": "Dog",
        "breed": "Jack Russell Terrier",
        "description": "This cute boy, Charly, is three years old and he likes adults and kids. He isn’t fond of many other dogs, so he might do best in a single dog home. Charly has lots of energy. We think a fenced yard would make him happy.",
        "age": "8 years",
        "inoculations": ["bordetella bronchiseptica", "leptospirosis"],
        "diseases": ["deafness", "blindness"],
        "parasites": ["lice", "fleas"]
    },
    {
        "id": "card-07",
        "name": "Scarlett",
        "img": "../img/modal/scarlett.png",
        "type": "Dog",
        "breed": "Jack Russell Terrier",
        "description": "Scarlett is a happy, playful girl who will make you laugh and smile. She forms a bond quickly and will make a loyal companion and a wonderful family dog or a good companion for a single individual too since she likes to hang out and be with her human.",
        "age": "3 months",
        "inoculations": ["parainfluenza"],
        "diseases": ["none"],
        "parasites": ["none"],
    },
    {
        "id": "card-08",
        "name": "Freddie",
        "img": "../img/modal/freddie.png",
        "type": "Cat",
        "breed": "British Shorthair",
        "description": "Freddie is a little shy at first, but very sweet when he warms up. He likes playing with shoe strings and bottle caps. He is quick to learn the rhythms of his human’s daily life. Freddie has bounced around a lot in his life, and is looking to find his forever home.",
        "age": "2 months",
        "inoculations": ["rabies"],
        "diseases": ["none"],
        "parasites": ["none"],
    }
]
const showModal = function (e) {

    let target = e.target
    let choosencard = target.closest('.slider__card').getAttribute('id')

    let el = petList.find(card => choosencard === card.id)

    popup.innerHTML = `
    <img class="popup__img" src="${el.img}" alt="${el.breed}"> 
    <div class="popup__contern">
    <p class="popup__pet-name">${el.name}</p>
    <p class="popup__pet-type">${el.type} - ${el.breed}</p>
    <p class="popup__pet-discr">${el.description}</p>
    <p class="popup__pet-detailes popup__pet-age"><b>Age: </b>${el.age}</p>
    <p class="popup__pet-detailes popup__pet-inoculations"><b>Inoculations: </b>${el.inoculations}</p>
    <p class="popup__pet-detailes popup__pet-diseases"><b>Diseases: </b>${el.diseases}</p>
    <p class="popup__pet-detailes popup__pet-parasites"><b>Parasites: </b>${el.parasites}</p>
    <span class="popup__close-btn">&times;</span>
    </div>
`
    if (target.closest('.slider__card')) {
        overlay.classList.add("active");
        popup.classList.remove('close')
        popup.classList.add('open')
        main.classList.add('body-scroll')
    }

    const closePopupBtn = document.querySelector('.popup__close-btn');
    closePopupBtn.addEventListener('click', closePopup)
    closePopupBtn.addEventListener('mouseenter',()=>{
        closePopupBtn.style.backgroundColor = '#F1CDB3'
    })
    
}

const closePopup = function (e) {
    overlay.classList.remove("active");
    popup.classList.add('close')
    popup.classList.remove('open')
    main.classList.remove('body-scroll')
}

// slider.addEventListener('click', showModal)
sliderPets.addEventListener('click', showModal)
overlay.addEventListener('click', closePopup)

/*Pagination******************************/
let page = 0;
let setOfCards = window.innerWidth > 768 ? 8 : window.innerWidth <= 320 ? 3 : 6;
window.addEventListener("resize", () => {
    let newSetOfCards = window.innerWidth > 768 ? 8 : window.innerWidth <= 320 ? 3 : 6;
    if (newSetOfCards !== setOfCards) setOfCards = newSetOfCards;
    sliderPets.innerHTML = ''
    sliderPets.insertAdjacentHTML('afterbegin', createCard(cardsArray[page]));
});


function shufleArr(mainArr, qtyPerPage) {
    let poolOfArr = [];
    let qtyOfPage = 48 / qtyPerPage; //6 , 8 , 12  


    while (poolOfArr.length < qtyOfPage) {
        poolOfArr.push(shufleEl(petList, setOfCards))
    }
    return poolOfArr
}

function shufleEl(mainArr, qtyPerPage) {
    let subArr = [];
    let indexSub = qtyPerPage; //8 , 6 , 4
    let random = 0;
    let skip;
    while (subArr.length < indexSub) {
        random = Math.floor(Math.random() * indexSub)
        skip = false;
        for (let i = 0; i < subArr.length; i++) {
            if (subArr[i].id === mainArr[random].id) {
                skip = true;
            }
        }
        if (skip === false) {
            subArr.push(mainArr[random]);
        }
    }

    return subArr
}

let cardsArray = shufleArr(petList, setOfCards)


sliderPets.insertAdjacentHTML('afterbegin', createCard(cardsArray[page]));

function moveToNextNext(e) {
    let target = e.target;
    if (target.closest('.slider__btn--next-next')) {
        sliderPets.innerHTML = ''
        page = cardsArray.length - 1;
        sliderPets.insertAdjacentHTML('afterbegin', createCard(cardsArray[page]));
        paginBtnCurr.textContent = page + 1;
        if (page + 1 === (48 / setOfCards)) {
            paginBtnNextNext.classList.add('not-act')
            paginBtnNext.classList.add('not-act')
            paginBtnNextNext.disabled = true;
            paginBtnNext.disabled = true;
            paginBtnPrev.disabled = false;
            paginBtnPrevPrev.disabled = false;

            paginBtnPrevPrev.classList.remove('not-act')
            paginBtnPrev.classList.remove('not-act')
            paginBtnNextNext.removeEventListener('click', moveToNextNext)
            paginBtnNext.removeEventListener('click', moveToNext)
            paginBtnPrev.addEventListener('click', moveToPrev)
            paginBtnPrevPrev.addEventListener('click', moveToPrevPrev)
        }
    }
}

function moveToNext(e) {
    let target = e.target;
    if (target.closest('.slider__btn--next')) {
        sliderPets.innerHTML = ''
        page += 1;
        sliderPets.insertAdjacentHTML('afterbegin', createCard(cardsArray[page]));
        paginBtnCurr.textContent = page + 1;
        if (page + 1 === 48 / setOfCards) {
            paginBtnNextNext.classList.add('not-act')
            paginBtnNext.classList.add('not-act')
            paginBtnNextNext.disabled = true;
            paginBtnNext.disabled = true;
            paginBtnPrev.disabled = false;
            paginBtnPrevPrev.disabled = false;

            paginBtnPrevPrev.classList.remove('not-act')
            paginBtnPrev.classList.remove('not-act')
            paginBtnNextNext.removeEventListener('click', moveToNextNext)
            paginBtnNext.removeEventListener('click', moveToNext)
            paginBtnPrev.addEventListener('click', moveToPrev)
            paginBtnPrevPrev.addEventListener('click', moveToPrevPrev)
        }
        if ((page !== 0 )&& (page + 1 !== 48 / setOfCards)) {
            paginBtnPrevPrev.classList.remove('not-act')
            paginBtnPrev.classList.remove('not-act')
            paginBtnNextNext.classList.remove('not-act')
            paginBtnNext.classList.remove('not-act')
            paginBtnPrev.disabled = false;
            paginBtnPrevPrev.disabled = false;
            paginBtnNextNext.disabled = false;
            paginBtnNext.disabled = false;
            paginBtnNextNext.addEventListener('click', moveToNextNext)
            paginBtnNext.addEventListener('click', moveToNext)
            paginBtnPrev.addEventListener('click', moveToPrev)
            paginBtnPrevPrev.addEventListener('click', moveToPrevPrev)
            

        }
    }
}

function moveToPrev(e) {
    let target = e.target;
    if (target.closest('.slider__btn--prev')) {
        sliderPets.innerHTML = ''
        page -= 1;
        sliderPets.insertAdjacentHTML('afterbegin', createCard(cardsArray[page]));
        paginBtnCurr.textContent = page + 2 - 1;

    if (page === 0) {
        paginBtnPrevPrev.classList.add('not-act')
        paginBtnPrev.classList.add('not-act')
        paginBtnPrev.disabled = true;
        paginBtnPrevPrev.disabled = true;

        paginBtnNextNext.classList.remove('not-act')
        paginBtnNext.classList.remove('not-act')
        paginBtnNextNext.addEventListener('click', moveToNextNext)
        paginBtnNext.addEventListener('click', moveToNext)
        paginBtnPrev.removeEventListener('click', moveToPrev)
        paginBtnPrevPrev.removeEventListener('click', moveToPrevPrev)

    } else if ((page !== 0 ) && (page + 1 !== 48 / setOfCards)) {
        paginBtnPrevPrev.classList.remove('not-act')
        paginBtnPrev.classList.remove('not-act')
        paginBtnNextNext.classList.remove('not-act')
        paginBtnNext.classList.remove('not-act')
        paginBtnPrev.disabled = false;
        paginBtnPrevPrev.disabled = false;
        paginBtnNextNext.disabled = false;
        paginBtnNext.disabled = false;
        paginBtnNextNext.addEventListener('click', moveToNextNext)
        paginBtnNext.addEventListener('click', moveToNext)
        paginBtnPrev.addEventListener('click', moveToPrev)
        paginBtnPrevPrev.addEventListener('click', moveToPrevPrev)

    }
}
}

function moveToPrevPrev(e) {
    let target = e.target;
    if (target.closest('.slider__btn--pre-prev')) {
        sliderPets.innerHTML = ''
        page = 0;
        sliderPets.insertAdjacentHTML('afterbegin', createCard(cardsArray[page]));
        paginBtnCurr.textContent = 1;

    if (page === 0) {
        paginBtnPrevPrev.classList.add('not-act')
        paginBtnPrev.classList.add('not-act')
        paginBtnPrev.disabled = true;
        paginBtnPrevPrev.disabled = true;
        paginBtnNextNext.disabled = false;
        paginBtnNext.disabled = false;

        paginBtnNextNext.classList.remove('not-act')
        paginBtnNext.classList.remove('not-act')
        paginBtnNextNext.addEventListener('click', moveToNextNext)
        paginBtnNext.addEventListener('click', moveToNext)
        paginBtnPrev.removeEventListener('click', moveToPrev)
        paginBtnPrevPrev.removeEventListener('click', moveToPrevPrev)

    } 
    // else if (page !== 0) {
    //     paginBtnPrevPrev.classList.remove('not-act')
    //     paginBtnPrev.classList.remove('not-act')
    //     paginBtnPrev.disabled = false;
    //     paginBtnPrevPrev.disabled = false;
    //     paginBtnNextNext.disabled = false;
    //     paginBtnNext.disabled = false;
    //     paginBtnPrev.addEventListener('click', moveToPrev)
    //     paginBtnPrevPrev.addEventListener('click', moveToPrevPrev)
    // }
}

}

function checkPage(){

}

paginBtnNextNext.addEventListener("click", moveToNextNext)
paginBtnNext.addEventListener('click', moveToNext)
paginBtnPrev.addEventListener('click', moveToPrev)
paginBtnPrevPrev.addEventListener('click', moveToPrevPrev)

function createCard(arr) {
    let newCards = '';

    for (let i = 0; i < arr.length; i++) {
        newCards += ` <div class="slider__card" id="${arr[i].id}">
                                    <div class="slider__card__img">
                                        <img src="${arr[i].img}" alt="${arr[i].type}">
                                    </div>
                                    <div class="slider__text-content">
                                        <p class="slider__card__name">${arr[i].name}</p>
                                        <button class="slider__card__btn button">Learn more</button>
                                    </div>
                                </div>
        `
    }
    return newCards;
}