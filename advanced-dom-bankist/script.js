'use strict';

///////////////////////////////////////
// Modal window

const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');
const btnCloseModal = document.querySelector('.btn--close-modal');
const btnsOpenModal = document.querySelectorAll('.btn--show-modal');

const nav = document.querySelector(".nav");
const tabs = document.querySelectorAll(".operations__tab");
const tabsContainer = document.querySelector(".operations__tab-container");
const tabsContent = document.querySelectorAll(".operations__content");


const btnScrollTo = document.querySelector('.btn--scroll-to');
const section1 = document.querySelector('#section--1');

const openModal = function (e) {
    e.preventDefault();
    modal.classList.remove('hidden');
    overlay.classList.remove('hidden');
};

const closeModal = function () {
    modal.classList.add('hidden');
    overlay.classList.add('hidden');
};

btnsOpenModal.forEach(btn => btn.addEventListener('click', openModal));

btnCloseModal.addEventListener('click', closeModal);
overlay.addEventListener('click', closeModal);

document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && !modal.classList.contains('hidden')) {
        closeModal();
    }
});

//scroll into certain point from learn more link
btnScrollTo.addEventListener("click", function () {
    section1.scrollIntoView({behavior: "smooth"});
})


//page navigation

//not efficient
// document.querySelectorAll(".nav__link").forEach(function (el) {
//     el.addEventListener("click", function (e) {
//         e.preventDefault();
//         const id = this.getAttribute("href");
//         document.querySelector(id).scrollIntoView({behavior: "smooth"});
//     })
// })

//we will use event delegation
document.querySelector(".nav__links").addEventListener("click", function (e) {
    e.preventDefault();
    const id = e.target.getAttribute("href");
    document.querySelector(id).scrollIntoView({behavior: "smooth"});
})

//building a tabbed content

tabsContainer.addEventListener("click", function (e) {
    const clicked = e.target.closest(".operations__tab");
    if (!clicked) return;
    tabs.forEach(t => t.classList.remove("operations__tab--active"));
    clicked.classList.add("operations__tab--active");
    tabsContent.forEach(c => c.classList.remove("operations__content--active"));
    document.querySelector(`.operations__content--${clicked.dataset.tab}`).classList.add("operations__content--active");
})


//menu fade animation

const handleHover = function (e, opacity) {
    if (e.target.classList.contains("nav__link")) {
        const link = e.target;
        const siblings = link.closest(".nav").querySelectorAll(".nav__link");
        const logo = link.closest(".nav").querySelector("img");
        siblings.forEach(el => {
            if (el !== link) el.style.opacity = opacity;

        });
        logo.style.opacity = opacity;
    }
}


nav.addEventListener('mouseover', e => handleHover(e, 0.5));
nav.addEventListener('mouseout', e => handleHover(e, 1));

const header = document.querySelector(".header");

const headerObserver = new IntersectionObserver(function (entries) {
    const ent = entries[0];
    if (ent.isIntersecting) nav.classList.remove("sticky");
    else nav.classList.add("sticky");
}, {
    root: null,
    threshold: 0,
    rootMargin: "-90px"
});

headerObserver.observe(header);


//reveal sections

const allSections = document.querySelectorAll(".section");

const revealSectionCallback = function (entries, observer) {
    const [entry] = entries;
    if (!entry.isIntersecting) return;
    entry.target.classList.remove("section--hidden");
    observer.unobserve(entry.target);
}

const sectionObserver = new IntersectionObserver(revealSectionCallback, {
    root: null,
    threshold: 0.15,
})

allSections.forEach((section) => {
    sectionObserver.observe(section);
    section.classList.add("section--hidden");
})


//Event propagation

// const randomInt = (min, max) => Math.floor(Math.random() * (max - min + 1) + min);
// const randomColor = () => `rgb(${randomInt(0, 255)},${randomInt(0, 255)},${randomInt(0, 255)})`;
// console.log(randomColor())
//
// document.querySelector(".nav__link").addEventListener("click", function (e) {
//     this.style.backgroundColor = randomColor();
//
//     //stop propagation
//     e.stopPropagation();
// })
//
// document.querySelector(".nav__links").addEventListener("click", function () {
//     this.style.backgroundColor = randomColor();
// })
//
// document.querySelector(".nav").addEventListener("click", function () {
//     this.style.backgroundColor = randomColor();
// })


// //selecting elements
//
// console.log(document.documentElement);
// console.log(document.head);
//
// const header = document.querySelector(".header");
// const allSections = document.querySelectorAll(".section");
// console.log(allSections);
//
// document.getElementById("section--1");
// const allButtons = document.getElementsByTagName("button");
//
// document.getElementsByClassName("btn");
//
// //c creating and inserting elements
//
// const message = document.createElement("div");
// message.classList.add("cookie-message");
// message.textContent = "We use cookies";
// message.innerHTML = "We use cookies. <button class='btn btn--close-cookie'>Got it!</button>"
//
// header.prepend(message);
//
// //header.append(message.cloneNode(true));
//
// //header.before(message);
// //header.after(message);
//
//
// //delete element
// document.querySelector(".btn--close-cookie").addEventListener("click", () => {
//     message.remove();
// });
//
// message.style.backgroundColor = "#37383d";
// message.style.width = "120%";
//
// console.log(getComputedStyle(message).height);
//
// document.documentElement.style.setProperty("--color-primary", "orangered");

// const h1 = document.querySelector("h1");
//
// const alertH1 = function () {
//     alert("ZOOOORT!!!!!!!!!!!!!!!!!!");
//
// }
//
// h1.addEventListener("mouseenter", alertH1);
//
// setTimeout(() => {//after 3 seconds, event will be removed!
//     h1.removeEventListener("mouseenter", alertH1);
// }, 3000)


//dom traversing:

// const h1 = document.querySelector("h1");
// console.log(h1.querySelector(".highlight"));
//
// console.log(h1.children);

//sticky navigation: Intersection Observer API

// const observerCallback = function (entries, observer) {
//     entries.forEach(entry => {
//         if (entry.isIntersecting) {
//             nav.classList.remove("sticky");
//         } else {
//             nav.classList.add("sticky");
//         }
//     })
// };
//
// const observerOptions = {
//     root: null,
//     threshold: 0.1
// };
//
// const observer = new IntersectionObserver(observerCallback, observerOptions);
// observer.observe(section1);













