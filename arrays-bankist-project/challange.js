"use strict";


const dogsKate = [3, 5, 2, 12, 7];
const dogsJulia = [4, 1, 15, 8, 3];


const checkDogs = function (arr1, arr2) {
    const removedCats = arr1.slice(1, -2);
    const allTogether = removedCats.concat(arr2);

    allTogether.forEach(function (dogAge, i) {
        if (dogAge > 3) {
            console.log(`Dog number ${i + 1} is an adult, and is ${dogAge} years old`)
        } else {
            console.log(`Dog number ${i + 1} is still a puppy`)
        }
    })
}

//checkDogs(dogsKate, dogsJulia);

//map method


const calcAverageHumanAge = function (ages) {
    const humanAges = ages.map(age => age <= 2 ? 2 * age : 16 + age * 4);
    const adults = humanAges.filter(age => age >= 18);
    return adults.reduce((acc, age) => acc + age, 0) / adults.length;

}


const breeds = [
    {
        breed: 'German Shepherd',
        averageWeight: 32,
        activities: ['fetch', 'swimming'],
    },
    {
        breed: 'Dalmatian',
        averageWeight: 24,
        activities: ['running', 'fetch', 'agility'],
    },
    {
        breed: 'Labrador',
        averageWeight: 28,
        activities: ['swimming', 'fetch'],
    },
    {
        breed: 'Beagle',
        averageWeight: 12,
        activities: ['digging', 'fetch'],
    },
    {
        breed: 'Husky',
        averageWeight: 26,
        activities: ['running', 'agility', 'swimming'],
    },
    {
        breed: 'Bulldog',
        averageWeight: 36,
        activities: ['sleeping'],
    },
    {
        breed: 'Poodle',
        averageWeight: 18,
        activities: ['agility', 'fetch'],
    },
];

let averageWeight = breeds.find(b => b.breed === "Husky").averageWeight;
console.log(averageWeight);

const breedRunAndFetch = breeds.find(b => b.activities.includes("running") && b.activities.includes("fetch")).breed;
console.log(breedRunAndFetch);

const allActivities = breeds.flatMap(b => b.activities);
console.log(allActivities);

const uniqueActivities = [...new Set(allActivities)];
console.log(uniqueActivities);


