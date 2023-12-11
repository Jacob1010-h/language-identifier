import { calculateChiSquare } from "./functions/chi-square.js";

import * as fs from 'fs';

const getFile = (path) => {
    return fs.readFileSync(path, 'utf8');
}
const writeFile = (path, data) => {
    fs.writeFileSync(path, JSON.stringify(data));
}
const removeWhitespaceAndCaps = (str) => {
    return str.toLowerCase().replace(/[^a-z]/g, '');
}
const getLettersCount = (str) => {
    const newString = removeWhitespaceAndCaps(str);
    const letters = newString.split('');
    const letterCount = {};
    letters.forEach(letter => {
        if (letterCount[letter]) {
            letterCount[letter]++;
        } else {
            letterCount[letter] = 1;
        }
    });
    return letterCount;
}
const getLetterAverage = (str, letter) => {
    const newString = removeWhitespaceAndCaps(str);
    const letterCount = getLettersCount(newString);
    const letterTotal = letterCount[letter];
    return letterTotal / newString.length;
}
const getAllLetterAverage = (str) => {
    const newString = removeWhitespaceAndCaps(str);
    var letterCount = Object.keys(getLettersCount(newString));
    let letterAverage = {};

    letterCount.forEach(letter => {
        letterAverage[letter] = getLetterAverage(newString, letter, letterCount);        
    });

    return letterAverage;
}

var json = JSON.parse( getFile('./letter-frequency.json') );

const values = json.sort((a, b) => {
    let aValue = Object.values(a)[0];
    let bValue = Object.values(b)[0];
    return aValue - bValue;
});

writeFile('./sorted-letter-frequency.json', values);

const text = getAllLetterAverage(removeWhitespaceAndCaps( getFile('./test.txt') ));

const sorted = [];
for (var i in text) {
    sorted.push([
        i, text[i]
    ]);
}

sorted.sort(function(a, b) {
    return b[1] - a[1];
});

console.log(values);
console.log("\n\n\n\n\n");
console.log(sorted);

// console.log(json);

// get the csv file

// let sol = calculateChiSquare(values.o, values.e);
// sol = sol.toFixed(3);

// round to 3 decimal places
// console.log("chi square: " + sol);