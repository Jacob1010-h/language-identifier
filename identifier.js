import { calculateChiSquare } from "./functions/chi-square.js";

import * as fs from 'fs';

const getFile = (path) => {
    return fs.readFileSync(path, 'utf8');
}
const writeFile = (path, data) => {
    fs.writeFileSync(path, JSON.stringify(data));
}
const removeWhitespaceAndCaps = (str) => {
    return str.toLowerCase().replace(/[^a-z\u00C0-\u00FF]/gi, '');
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
const transform = (json) => {
    let transformedJson = [];

    for (let i = 0; i < json.length; i++) {
        let languageObj = json[i];

        for (let language in languageObj) {
            let lettersObj = languageObj[language];
            let sortedLetters = [];

            for (let letter in lettersObj) {
                if (lettersObj[letter] !== 0) {
                    sortedLetters.push([letter, lettersObj[letter]]);
                }
            }

            sortedLetters.sort((a, b) => b[1] - a[1]);
            transformedJson.push({[language]: sortedLetters});
        }
    }

    return transformedJson;
}
function chiSquare(observed, expected) {
    // Pad the shorter array with zeros
    while (observed.length < expected.length) {
        observed.push(['', 0]);
    }
    while (expected.length < observed.length) {
        expected.push(['', 0]);
    }

    let chi = 0;
    for (let i = 0; i < observed.length; i++) {
        if (!Array.isArray(observed[i]) || !Array.isArray(expected[i])) {
            throw new Error('Observed and expected elements must be arrays');
        }

        let diff = observed[i][1] - expected[i][1];
        if (expected[i][1] !== 0) {
            chi += diff * diff / expected[i][1];
        }
    }
    return chi;
}

var json = JSON.parse( getFile('./letter-frequency.json') );

const newJson = json.sort((a, b) => {
    let aValue = Object.values(a)[0];
    let bValue = Object.values(b)[0];
    return aValue - bValue;
});

writeFile('./sorted-letter-frequency.json', newJson);

const text = getAllLetterAverage(removeWhitespaceAndCaps( getFile('./test.txt') ));

let sorted = [];
for (var i in text) {
    sorted.push([
        i, text[i]
    ]);
}

sorted.sort(function(a, b) {
    return b[1] - a[1];
});

let transformedJson = transform(newJson);

sorted = sorted.map(([letter, value]) => [letter, value * 100]);

// console.log(JSON.stringify(transformedJson, null, 2));
// print the Spanish letters 
let spanishData = transformedJson.find(obj => obj.hasOwnProperty('Spanish'));
console.log(spanishData);
console.log("\n\n\n\n\n");
console.log(sorted);

// find the chi value for each language
let chiValues = {};

for (let i = 0; i < transformedJson.length; i++) {
    let language = Object.keys(transformedJson[i])[0];
    let observed = transformedJson[i][language];
    chiValues[language] = chiSquare(observed, sorted);
}

console.log(chiValues);

// find the language with the lowest chi value that is a number 
// (not NaN or Infinity)
let lowestChi = Infinity;
let lowestChiLanguage = '';
for (let language in chiValues) {
    if (chiValues[language] < lowestChi && !isNaN(chiValues[language]) && isFinite(chiValues[language])) {
        lowestChi = chiValues[language];
        lowestChiLanguage = language;
    }
}


console.log("\n\n\n\n\n");
console.log("The language is: " + lowestChiLanguage);
console.log("The chi value is: " + lowestChi);
