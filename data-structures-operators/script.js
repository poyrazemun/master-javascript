'use strict';

// // Data needed for a later exercise
// const flights =
//     '_Delayed_Departure;fao93766109;txl2133758440;11:25+_Arrival;bru0943384722;fao93766109;11:45+_Delayed_Arrival;hel7439299980;fao93766109;12:05+_Departure;fao93766109;lis2323639855;12:30';
//

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


//Spread Operator

const arr = [7, 8, 9];

const newArr = [1, 2, ...arr];
console.log(newArr);

console.log(...newArr);

//Join 2 arrays:

const mergedMenu = [...restaurant.mainMenu, ...restaurant.starterMenu];
console.log(mergedMenu);

//Spread operator can be used with all iterables and also Objects. Iterables: arrays, strings, maps, sets.

const yourName = "Jonas";
console.log(...yourName);

const newRestaurant = {foundedIn: 1998, ...restaurant, founder: "Omer"};
console.log(newRestaurant);


//rest pattern and parameters

const [o, i, ...others] = [1, 2, 3, 4, 5];

//console.log(o, i, others);

const [food1, , food2, ...otherFood] = [...restaurant.mainMenu, ...restaurant.starterMenu];

//console.log(food1, food2, otherFood);

const add = (...numbers) => console.log(numbers);
add(1, 2, 3);
add(1, 2, 3, 657);
add(1, 2, 3, 0, -98);

const ex = [23, 6, 96];
add(...ex);


//Spread expands -> Turns a collection → into individual elements ->> Spread = unpack

//Rest collects --> Takes individual elements → packs them into a collection --> Rest = pack

//short circuiting:
console.log("------ OR ---------");
console.log(3 || "Omer"); //eger ilk value truthy ise hemen onnu yazdirir. 2. valueye bakilmaz bile. Yani 3

console.log("" || "Omer");//Omer
console.log(true || 0);//true
console.log(undefined || null);//null

//eger iki deger de falsy ise 2.yi donuyor!!!

console.log(undefined || 0 || "" || "Hello" || 23 || null);//Hello yazdiracak cunku it is the first truthy value


// restaurant.numGuests = 23;
// const guests1 = restaurant.numGuests ? restaurant.numGuests : 10;
// console.log(guests1);

const guest2 = restaurant.numGuests || 10;
console.log(guest2);


console.log("------ AND ---------");

//AND operator returns the 1st falsy value.

console.log(0 && "Omer");//0
console.log("" && "Omer");//""
console.log(true && 0);//0
console.log(undefined && null);//undefined


//nullish coalescing operator (??)
//eger ?? kullanmazsam mesela numGuests 0 olsa bile falsy value oldugu icin yine de 10 yazdirilacak.
//bu yuzden asagidaki gibi nullish coalescing kullanmaliyim. Sadece null ve undefined olup olmadigini kontrol ediyor.
restaurant.numGuests = 0;
const guests1 = restaurant.numGuests ?? 10;
console.log(guests1);


//logical assignment operators

const rest1 = {
    name: "Capri",
    numGuests: 0
}

const rest2 = {
    name: "Mamri",
    owner: "Michael"
}

//OR ASSIGNMENT OPERATOR
// rest1.numGuests ||= 10;
// rest2.numGuests ||= 10;

//nullish ASSIGNMENT OPERATOR (checks null or undefined!)
rest1.numGuests ??= 10;
rest2.numGuests ??= 10;

//AND ASSIGNMENT OPERATOR
rest1.owner &&= "ANONMYZED!"
rest2.owner &&= "ANONMYZED!"

console.log(rest1);
console.log(rest2);


//for of loop

const fruits = ["apple", "banana", "orange"];

for (const fruit of fruits) {
    console.log(fruit);
}


const word = "hello";

for (const char of word) {
    console.log(char);
}

const numbers = [10, 20, 30, 40, 50];

for (const num of numbers) {
    if (num === 30) {
        break; // stop the loop
    }
    console.log(num);
}

const names = ["Omer", "Fatih", "Poyraz"];

for (const entry of names.entries()) {
    console.log(entry);
}


//
// OPTIONAL CHAINING EXAMPLES
//

// ---------------------------------------------
// 1️⃣ Optional Chaining with OBJECTS
// ---------------------------------------------

const user = {
    profile: {
        name: "Omer",
    },
};

// Without optional chaining → could throw an error if something is undefined:
// user.settings.theme   ❌ (settings does not exist)

// With optional chaining:
console.log(user.settings?.theme);
// ❗ Output: undefined
// Explanation: JS safely checks `settings`. If it doesn't exist,
// it stops and returns undefined instead of throwing an error.

console.log(user.profile?.name);
// ✔ Output: "Omer"
// Explanation: `profile` exists, so it returns `name` normally.


// ---------------------------------------------
// 2️⃣ Optional Chaining with ARRAYS
// ---------------------------------------------

const users = [
    {name: "John"},
    null,
    {name: "Sarah"},
];

console.log(users[1]?.name);
// ❗ Output: undefined
// Explanation: users[1] is null. Without optional chaining you'd get an error.
// But ?. stops execution and safely returns undefined.

console.log(users[2]?.name);
// ✔ Output: "Sarah"


// ---------------------------------------------
// 3️⃣ Optional Chaining with METHODS
// ---------------------------------------------

const objj = {
    greet() {
        return "Hello!";
    }
};

// Safe method call:
console.log(objj.greet?.());
// ✔ Output: "Hello!"
// Explanation: Checks if greet exists before calling it.

// Unsafe method call if method doesn't exist:
console.log(objj.sayHi?.());
// ❗ Output: undefined
// Explanation: No error is thrown. JS safely returns undefined.


// ---------------------------------------------
// 4️⃣ Optional Chaining on DEEP NESTING
// ---------------------------------------------

const shop = {
    products: [
        {details: {price: 100}},
        null,
    ]
};

// Safe navigation through multiple layers:
console.log(shop.products?.[0]?.details?.price);
// ✔ Output: 100

console.log(shop.products?.[1]?.details?.price);
// ❗ Output: undefined
// Explanation: products[1] is null → optional chaining prevents crash.


// ---------------------------------------------
// 5️⃣ Optional Chaining with FUNCTION RETURN VALUES
// ---------------------------------------------

function getUser() {
    return null;
}

// If getUser() returns null, accessing .name would cause an error.
// Optional chaining fixes that:
console.log(getUser()?.name);
// ❗ Output: undefined
//


//Sets

//Collection of unique values, no duplication and order of elements are not preserved.
//sets are iterable

const italianFoods = new Set([
    'pasta',
    'gnocchi',
    'tomatoes',
    'olive oil',
    'garlic',
    'basil',
]);

const mexicanFoods = new Set([
    'tortillas',
    'beans',
    'rice',
    'tomatoes',
    'avocado',
    'garlic',
]);

const ordersSet = new Set(["Pasta", "Pizza", "Pasta", 3, 8990]);

console.log(ordersSet);

console.log(ordersSet.size);
console.log(ordersSet.has("Pasta"));

ordersSet.add("Garlic Bread");

ordersSet.delete(3);

//ordersSet.clear();//delete all the elements

//console.log(ordersSet);

for (const any of ordersSet) {
    console.log(any);
}

const staff = ["Waiter", "Chef", "Waiter", "Manager", "Chef", "Waiter"];
const uniqueStaffs = new Set(staff);
console.log(uniqueStaffs);

//convert that set to Array
const uniqueStaffArray = [...uniqueStaffs];
console.log(uniqueStaffArray);


//new methods of Set
//intersection method
const commonFoods = italianFoods.intersection(mexicanFoods);
console.log(commonFoods);

const commonFoodsAsArray = [...commonFoods];
console.log(commonFoodsAsArray);

//union method
const combinedFoods = italianFoods.union(mexicanFoods);
console.log(combinedFoods);

const combinedFoodsAsArray = [...combinedFoods];
console.log(combinedFoodsAsArray);

//difference method -> gives all the elements which are present in the first set but not in the second one

const differenceFoodItalian = italianFoods.difference(mexicanFoods);
console.log(differenceFoodItalian);

const differenceFoodItalianAsArray = [...differenceFoodItalian];
console.log(differenceFoodItalianAsArray);

//symmetric difference method -> gives all the elements which are present in the first set but not in the second one and vice versa

const foodsWithoutIntersection = italianFoods.symmetricDifference(mexicanFoods);
console.log(foodsWithoutIntersection);

const foodsWithoutIntersectionAsArray = [...foodsWithoutIntersection];
console.log(foodsWithoutIntersectionAsArray);

//isDisjointFrom method -> returns true if there is no intersection between the two sets

console.log(italianFoods.isDisjointFrom(mexicanFoods));

//Map

//Map and Object -> both store key–value pairs, they behave differently and are suited for different scenarios
//Keys are converted to strings (or symbols) in Objects. But in Map, key can be any data type.

const rest = new Map();
rest.set("name", "Classico");
rest.set(1, "Italy");
rest.set(22, "Lisbon");

console.log(rest.get("name"));

//methods:

console.log(rest.has("name"));
console.log(rest.size);
rest.delete(22);

console.log(rest);

//rest.clear();


const question = new Map([
    ["question", "What is the best programming language in the world?"],
    [1, "C"],
    [2, "Python"],
    [3, "JavaScript"],
    ["correct", 3],
    [true, "Correct"],
    [false, "Try Again"],
]);
console.log(question);


//convert object to map

const obje = {
    name: "John",
    age: 30,
    city: "New York",
};

const objToMap = new Map(Object.entries(obje));
console.log(objToMap);


for (const [key, value] of question) {
    if (typeof key === "number") {
        console.log(key, value);
    }
}



