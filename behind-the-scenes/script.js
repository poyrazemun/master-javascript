"use strict";

// const jonas = {
//     year: 1991,
//     calcAge: function () {
//         //console.log(this);
//         console.log(2037 - this.year);
//     },
// }
//
// jonas.calcAge();
//
// const matilda = {
//     year: 2017,
// };
//
// matilda.calcAgeee = jonas.calcAge;
// matilda.calcAgeee();

let lastName = "omer";
console.log(lastName);

const jonas = {
    firstName: "Jonas",
    year: 1991,
    calcAge: function () {
        console.log(this);
        console.log(2037 - this.year);
        const isMillenial = () => console.log(this.year >= 1981 && this.year <= 1996);
        isMillenial();
    },
    // greet: () => console.log("hello " + this.firstName)//arrow function oldugu icin this kullanilmaz.


}


jonas.calcAge();

//arguments keyword:


const addExpr = function (a, b) {
    console.log(arguments);
    return a + b;
}

//function sadece 2 tane argument alacak gibi tanimlansa da bircok argument alabiliyor. bu legal.
addExpr(2, 5);
addExpr(2, 5, 6, 7);


//object references in practice (SHALLOW vs DEEP Copies)

const jessica = {
    firstName: "Jessica",
    lastName: "Williams",
    age: 27
}

const marriedJessica = jessica;
marriedJessica.lastName = "Davis";
console.log("Before marriage:", jessica.lastName);
console.log("After marriage:", marriedJessica.lastName);

//marriedJessica and jessica are the same object in the heap. so when we change one of them, the other one changes as well. this is called shallow copy.

const jessica2 = {
    firstName: "Jessica",
    lastName: "Williams",
    age: 27,
    family: ["Alice", "Bob"]
}

const jessicaCopy = {...jessica2};//this is creating a brand new object in the heap. but the family array is still the same reference in the heap. so when we change one of them, the other one changes as well. this is called shallow copy.

console.log(jessica2);
console.log(jessicaCopy);

//Object.assign() method creates a shallow copy of the object. so when we change one of them, the other one changes as well. this is called shallow copy.

jessica2.lastName = "Davis";

console.log(jessicaCopy, jessica2);//only the jessica2's lastName is changed but the jessicaCopy's lastName is not changed because we created a new object in the heap.


//deep clone/copy

const jessicaClone = structuredClone(jessica2);//this is creating a brand new object in the heap. and the family array is also a new reference in the heap. so when we change one of them, the other one does not change. this is called deep copy.

jessica2.family.push("Mary");
jessica2.family.push("John");

console.log(jessicaClone, jessica2);












