'use strict';

// // Data needed for a later exercise
// const flights =
//     '_Delayed_Departure;fao93766109;txl2133758440;11:25+_Arrival;bru0943384722;fao93766109;11:45+_Delayed_Arrival;hel7439299980;fao93766109;12:05+_Departure;fao93766109;lis2323639855;12:30';
//
// const italianFoods = new Set([
//     'pasta',
//     'gnocchi',
//     'tomatoes',
//     'olive oil',
//     'garlic',
//     'basil',
// ]);
//
// const mexicanFoods = new Set([
//     'tortillas',
//     'beans',
//     'rice',
//     'tomatoes',
//     'avocado',
//     'garlic',
// ]);

const restaurant = {
    name: 'Classico Italiano',
    location: 'Via Angelo Tavanti 23, Firenze, Italy',
    categories: ['Italian', 'Pizzeria', 'Vegetarian', 'Organic'],
    starterMenu: ['Focaccia', 'Bruschetta', 'Garlic Bread', 'Caprese Salad'],
    mainMenu: ['Pizza', 'Pasta', 'Risotto'],

    order: function (starterIndex, mainIndex) {
        return [this.starterMenu[starterIndex], this.mainMenu[mainIndex]];
    },
    //asagida functionin argumenti olarak object destructuring yapiyoruz.
    orderDelivery: function ({starterIndex = 1, mainIndex = 0, time = "20:00", address}) {
        console.log(`Order received! ${this.starterMenu[starterIndex]} and ${this.mainMenu[mainIndex]}
        will be delivered to ${address} at ${time}.`);
    },
    openingHours: {
        thu: {
            open: 12,
            close: 22,
        },
        fri: {
            open: 11,
            close: 23,
        },
        sat: {
            open: 0, // Open 24 hours
            close: 24,
        },
    },
};

let [main, , secondary] = restaurant.categories;
console.log(main, secondary);

[main, secondary] = [secondary, main]; //bu array destructuring. Sol taraf sanki array gibi gorunuyor ama degil.

console.log("After destructuring:" + main + " " + secondary);
//console.log(restaurant.order(2, 0));

const [starterFood, mainCourse] = restaurant.order(2, 0);
console.log(starterFood + " and " + mainCourse);

//default values in array destructuring:

const [p = 1, q = 1, r = 1] = [8, 9];
console.log(p, q, r); //destruct etmeye calisitigm array sadece iki elemanli oldugu icin r otomatik olarak 1 olacak cunku default value'yi
//o sekilde belirledim.


//Object destructuring:

//object destrucuring yaparken exact isimleri vermek zorundayiz. Ama eger farkli isim vermek istersek
//o da bir sonraki ornekte.
const {name, openingHours, categories} = restaurant;
console.log(name, openingHours, categories);

//bir sonraki ornek xD

const {name: restaurantName, openingHours: hours, categories: tags} = restaurant;
console.log(restaurantName, hours, tags);

//default values in Object destructuring:

const {menu = [], starterMenu: starters = []} = restaurant;

console.log(menu, starters);

//mutating variables

let a = 111;
let b = 999;

const obj = {a: 23, b: 7, c: 14};

({a, b} = obj);//parantez ile baslamam lazim cunku {} ile baslarsam js expects code block.

console.log(a, b);


//nested objects
const {fri} = openingHours;
console.log(fri);

const {open: openingTimeFriday, close: closingTimeFriday} = fri;
console.log(openingTimeFriday, closingTimeFriday);

//object destructuring in function
restaurant.orderDelivery({address: "Eskisehir", starterIndex: 2});













