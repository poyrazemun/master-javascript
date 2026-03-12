'use strict';
// BANKIST APP

// Data
const account1 = {
    owner: 'Jonas Schmedtmann',
    movements: [200, 450, -400, 3000, -650, -130, 70, 1300],
    interestRate: 1.2, // %
    pin: 1111,
};

const account2 = {
    owner: 'Jessica Davis',
    movements: [5000, 3400, -150, -790, -3210, -1000, 8500, -30],
    interestRate: 1.5,
    pin: 2222,
};

const account3 = {
    owner: 'Steven Thomas Williams',
    movements: [200, -200, 340, -300, -20, 50, 400, -460],
    interestRate: 0.7,
    pin: 3333,
};

const account4 = {
    owner: 'Sarah Smith',
    movements: [430, 1000, 700, 50, 90],
    interestRate: 1,
    pin: 4444,
};

const accounts = [account1, account2, account3, account4];

// Elements
const labelWelcome = document.querySelector('.welcome');
const labelDate = document.querySelector('.date');
const labelBalance = document.querySelector('.balance__value');
const labelSumIn = document.querySelector('.summary__value--in');
const labelSumOut = document.querySelector('.summary__value--out');
const labelSumInterest = document.querySelector('.summary__value--interest');
const labelTimer = document.querySelector('.timer');

const containerApp = document.querySelector('.app');
const containerMovements = document.querySelector('.movements');

const btnLogin = document.querySelector('.login__btn');
const btnTransfer = document.querySelector('.form__btn--transfer');
const btnLoan = document.querySelector('.form__btn--loan');
const btnClose = document.querySelector('.form__btn--close');
const btnSort = document.querySelector('.btn--sort');

const inputLoginUsername = document.querySelector('.login__input--user');
const inputLoginPin = document.querySelector('.login__input--pin');
const inputTransferTo = document.querySelector('.form__input--to');
const inputTransferAmount = document.querySelector('.form__input--amount');
const inputLoanAmount = document.querySelector('.form__input--loan-amount');
const inputCloseUsername = document.querySelector('.form__input--user');
const inputClosePin = document.querySelector('.form__input--pin');


const displayMovements = function (movements, sort = false) {
    containerMovements.innerHTML = '';

    const movs = sort ? movements.slice().sort((a, b) => a - b) : movements;

    movs.forEach(function (mov, i) {

        const type = mov > 0 ? 'deposit' : 'withdrawal';

        const html = `<div class="movements__row">
            <div class="movements__type movements__type--${type}">${i + 1} ${type}</div>
            <div class="movements__value">${mov}€</div>
        </div>`;

        containerMovements.insertAdjacentHTML('afterbegin', html);
    })
}
const calcPrintBalance = function (acc) {
    acc.balance = acc.movements.reduce((acc, mov) => acc + mov, 0);
    labelBalance.textContent = `${acc.balance}€`;
}

const createUserNames = function (accs) {
    accs.forEach(acc => acc.userName = acc.owner.toLowerCase().split(' ').map(name => name[0]).join(''))
}

createUserNames(accounts);

const calcDisplaySummary = function (acc) {
    const incomes = acc.movements.filter(mov => mov > 0).reduce((acc, mov) => acc + mov, 0);
    const outgoings = acc.movements.filter(mov => mov < 0).reduce((acc, mov) => acc + mov, 0);
    const interest = acc.movements.filter(mov => mov > 0).map(deposit => (deposit * acc.interestRate) / 100).filter((int) => int >= 1).reduce((acc, int) => acc + int, 0);
    labelSumIn.textContent = `${incomes}€`;
    labelSumOut.textContent = `${Math.abs(outgoings)}€`;
    labelSumInterest.textContent = `${interest}€`;
}

//login

let currentAccount;

const updateAccountUI = function (acc) {
    displayMovements(acc.movements);
    calcPrintBalance(acc);
    calcDisplaySummary(acc);
}

btnLogin.addEventListener("click", function (e) {
    e.preventDefault();//form submit button's default behavior is to renew the page, here we are preventing that
    const username = inputLoginUsername.value;
    const pin = Number(inputLoginPin.value);
    currentAccount = accounts.find(acc => acc.userName === username && acc.pin === pin);
    if (currentAccount) {
        labelWelcome.textContent = `Welcome back, ${currentAccount.owner.split(' ')[0]}`;
        containerApp.style.opacity = 1;
        inputLoginUsername.value = inputLoginPin.value = '';
        inputLoginUsername.blur();
        inputLoginPin.blur();//to take focus away from the input
        updateAccountUI(currentAccount);
    }
});


//transfer money

btnTransfer.addEventListener("click", function (e) {
    e.preventDefault();
    const amount = Number(inputTransferAmount.value);
    const receiverAcc = accounts.find(acc => acc.userName === inputTransferTo.value);
    inputTransferAmount.value = '';
    inputTransferTo.value = '';
    if (amount > 0 && amount <= currentAccount.balance && receiverAcc && receiverAcc.userName !== currentAccount.userName) {
        currentAccount.movements.push(-amount);
        receiverAcc.movements.push(amount);
        updateAccountUI(currentAccount);
    }
});

//loan

btnLoan.addEventListener("click", function (e) {
    e.preventDefault();
    const amount = Number(inputLoanAmount.value);
    if (amount > 0 && currentAccount.movements.some(mov => mov >= amount * 0.1)) {
        currentAccount.movements.push(amount);
        updateAccountUI(currentAccount);
    }
    inputLoanAmount.value = '';
    inputLoanAmount.blur();
})

//close account

btnClose.addEventListener("click", function (e) {
    e.preventDefault();
    const index = accounts.findIndex(
        acc =>
            acc.userName === inputCloseUsername.value &&
            acc.pin === Number(inputClosePin.value)
    );//eger boyle bir account yoksa index = -1 oluyor.

    if (index !== -1) {
        accounts.splice(index, 1);
        containerApp.style.opacity = 0;
        labelWelcome.textContent = "Log in to get started";
    }
})

//sort button
let sorted = false;
btnSort.addEventListener("click", function (e) {
    e.preventDefault();

    displayMovements(currentAccount.movements, !sorted);
    sorted = !sorted;
})

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// LECTURES

const currencies = new Map([
    ['USD', 'United States dollar'],
    ['EUR', 'Euro'],
    ['GBP', 'Pound sterling'],
]);

// currencies.forEach((value, key, map) => console.log(`${key}: ${value}`))
//
// const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];
//
// movements.forEach(function (movement, i, arr) {
//     if (movement > 0) {
//         console.log(`Movement ${i + 1}: You deposited ${movement}.`);
//     } else {
//         console.log(`Movement ${i + 1}: You withdrew ${Math.abs(movement)}.`);
//     }
// })

/////////////////////////////////////////////////

// let arr = ['a', 'b', 'c', 'd', 'e'];
// // Slice method
// console.log(arr.slice(2));
// console.log(arr.slice(2, 4));
//
// let arr2 = arr.slice();
// console.log(arr2);
//
// //SPLICE METHOD: changing the original array
// let finalElements = arr.splice(-1);
// console.log(arr);
// console.log(finalElements);
//
// //reverse method => changes the original array
// const newArr = ["z", "x", "y", "s", "l"];
// newArr.reverse();
// console.log(newArr);
//
// //concat
// console.log(newArr.concat(arr2));
//
// //join method
// console.log(newArr.join("-----"));
//
// //at method
// const myArr = [23, 11, 64];
// console.log(myArr.at(0));
// console.log(myArr.at(-1));//prints the last element

//map method
// const euroToUsd = 1.1;
//
// let convertedMovements = account1.movements.map(mov => mov * euroToUsd);
// console.log(convertedMovements);
//
// const movementDescriptions = account1.movements.map((mov, i, arr) => {
//     if (mov > 0) {
//         return (`Movement ${i + 1}: You deposited ${mov}.`);
//     } else {
//         return (`Movement ${i + 1}: You withdrew ${Math.abs(mov)}.`);
//
//     }
// })
//
// console.log(movementDescriptions)

//filter method

// let deposits = account1.movements.filter(mov => mov > 0);
// console.log(deposits);
//
//
// //reduce method
//
// let balance = account1.movements.reduce((acc, mov) => acc + mov, 0);
// console.log(balance);


// //find method
//
// let firstWithdrawal = account1.movements.find(mov => mov < 0);//first found element
// console.log(firstWithdrawal);


//findIndex method -> return the index of the found amount
//findLast and findLastIndex

// Example for findLast
const transactions = [200, -450, 3000, -650, -130, 70, 1300];
const lastNegativeTransaction = transactions.findLast(amount => amount < 0);
//console.log(lastNegativeTransaction); // Output: -130

// Example for findLastIndex
const lastNegativeTransactionIndex = transactions.findLastIndex(amount => amount < 0);
//console.log(lastNegativeTransactionIndex); // Output: 4


//some and every
// Example for some
const hasDeposits = transactions.some(amount => amount > 0);
//console.log(hasDeposits); // Output: true (since there are positive transactions)

// Example for every
const allDepositsPositive = transactions.every(amount => amount > 0);
//console.log(allDepositsPositive); // Output: false (since there are negative transactions)


//flat and flatMap

// Example for flat
// The flat method is used to flatten a nested array. The argument specifies the depth of flattening.
const nestedArray = [1, [2, 3], [4, [5, 6]]];
const flattenedArray = nestedArray.flat(2); // Flattens the array to a depth of 2

//console.log(flattenedArray); // Output: [1, 2, 3, 4, 5, 6]


// Example for flatMap
// The flatMap method combines map and flat into a single method. It maps each element to a new array and then flattens the result by one level.
const transactionsWithFees = transactions.flatMap(amount => [amount, amount * 0.1]); // Maps each transaction to an array of the transaction and its 10% fee, then flattens the result
//console.log(transactionsWithFees); // Output: [200, 20, -450, -45, 3000, 300, ...]


//sorting arrays:
//1


//2

//sorting an array

// Example 1: Sorting numbers in ascending order
// The sort method sorts the elements of an array. By default, it converts elements to strings and compares their UTF-16 code values.
// To sort numbers correctly, a compare function is provided.
const numbers = [200, -450, 3000, -650, -130, 70, 1300];
numbers.sort((a, b) => a - b); // Ascending order//mutes the array
//console.log(numbers); // Output: [-650, -450, -130, 70, 200, 1300, 3000]

// Example 2: Sorting strings alphabetically
// Strings are sorted based on their Unicode values by default.
const fruits = ['banana', 'apple', 'cherry', 'date'];
fruits.sort(); // Alphabetical order
//console.log(fruits); // Output: ['apple', 'banana', 'cherry', 'date']


//array grouping

// Example 1: Grouping numbers into positive and negative
// Group transactions into 'positive' and 'negative' categories.
const groupedTransactions = {
    positive: transactions.filter(amount => amount > 0),
    negative: transactions.filter(amount => amount < 0),
};
console.log(groupedTransactions); // Output: { positive: [200, 3000, 70, 1300], negative: [-450, -650, -130] }

// Example 2: Grouping objects by a property
// Group people by their age.
const people = [
    {name: 'Alice', age: 25},
    {name: 'Bob', age: 30},
    {name: 'Charlie', age: 25},
    {name: 'David', age: 30}
];
const groupedByAge = {
    25: people.filter(person => person.age === 25),
    30: people.filter(person => person.age === 30),
};
console.log(groupedByAge); // Output: { 25: [{ name: 'Alice', age: 25 }, { name: 'Charlie', age: 25 }], 30: [{ name: 'Bob', age: 30 }, { name: 'David', age: 30 }] }

let groupBy = Object.groupBy(people, person => person.name);
console.log(typeof groupBy);
console.log(groupBy);


//fill method

// Example 1: Filling an array with a static value
// The fill method changes all elements in an array to a static value, from a start index to an end index.
const arr1 = [1, 2, 3, 4, 5];
arr1.fill(0, 1, 4); // Fill with 0 from index 1 to index 4 (not inclusive)
console.log(arr1); // Output: [1, 0, 0, 0, 5]

// Example 2: Filling an entire array
// You can use fill to replace all elements in an array with a single value.
const arr2 = new Array(5); // Create an empty array with 5 slots
arr2.fill(7); // Fill the entire array with 7
console.log(arr2); // Output: [7, 7, 7, 7, 7]

//Array.from
const z = Array.from({length: 7}, (_, i) => i + 1);
console.log(z);

const random = Array.from({length: 100}, (_, i) => Math.floor(Math.random() * 6) + 1);
console.log(random);


const bankDepositsTotal = accounts.flatMap(acc => acc.movements).filter(mov => mov > 0)
    .reduce((acc, mov) => acc + mov, 0);
console.log(bankDepositsTotal);


const amount = accounts.flatMap(acc => acc.movements).filter(mov => mov >= 1000).length;
console.log(amount);

