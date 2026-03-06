'use strict';

const bookings = [];

//writing default parameters
const createBooking = (flightNum, numPassengers = 500, price = 66 * numPassengers) => {

    const booking = {
        flightNum,
        numPassengers,
        price
    }

    console.log(booking);
    bookings.push(booking);
}

//createBooking("TH350");


const flight = "LH1234";
const jonas = {
    name: "Jonas Schmedtmann",
    passport: 24739479284
}

const checkIn = function (flightNum, passenger) {
    flightNum = "LH999";
    passenger.name = "Mr. " + passenger.name;

    if (passenger.passport === 24739479284) {
        alert("Check in successful");
    } else {
        alert("Wrong passport number");
    }
}

//checkIn(flight, jonas);
//console.log(jonas.name);


const oneWord = (str) => {
    return str.replace(/ /g, '').toLowerCase();
}

const upperFirstWord = (str) => {
    const [first, ...others] = str.split(' ');
    return [first.toUpperCase(), ...others].join(' ');
}

//call back function
const transformer = function (str, func) {
    console.log("Original string: " + str);
    console.log(`Transformed string: ${func(str)}`);
    console.log(`Transformed by: ${func.name}`);
}


transformer("Omer Fatih", upperFirstWord);
transformer("Omer Fatih", oneWord);


//function returns a function

const greet = (greeting) => {
    return (name) => {
        console.log(`${greeting} ${name}`);
    }
}

let helloGreet = greet("Hello");
helloGreet("Omer");
helloGreet("John");

//call method
const lh = {
    airline: "Lufthansa",
    iataCode: "LH",
    bookings: [],
    book(flightNum, name) {
        console.log(`${name} booked a seat on ${this.airline} flight ${this.iataCode}${flightNum}`);
        this.bookings.push({flight: `${this.iataCode}${flightNum}`, name});
    }
}

lh.book(239, "Omer");
lh.book(636, "Fatih");


const eurowings = {
    airline: "Eurowings",
    iataCode: "EW",
    bookings: [],

}


const book = lh.book;

book.call(eurowings, 23, "Omer Fatih Poyraz");
book.call(lh, 1111, "Mr. Smith");

console.log(lh);
console.log(eurowings);


//apply method (very similar to call method but the second argument is array) //not used that much
const flightData = [5833, "George"];
book.apply(eurowings, flightData);
book.call(lh, ...flightData);

//bind method (does not call the function immediately, return the function by binding the this keyword)

const bookEW = book.bind(eurowings);
bookEW(23, "John M");


const bookEW23 = book.bind(eurowings, 23);
bookEW23("Koller");

//bind with event listeners

lh.planes = 300;
lh.buyPlane = function () {
    console.log(this);
    this.planes++;
    console.log(this.planes);
}

document.querySelector(".buy").addEventListener("click", lh.buyPlane.bind(lh));


//immediately invoked function expression (IIFE)

(function () {
    console.log("This will never run again");
})();
console.log("Hello World");





