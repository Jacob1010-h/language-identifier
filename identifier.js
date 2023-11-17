import { calculateChiSquare } from "./functions/chi-square.js";
import * as functions from './functions/functions.js';

import * as fs from 'fs';

const file = './letter-frequency.json';

var json = JSON.parse( fs.readFileSync(file, 'utf8') );

const values = functions.sortAllObjectsByValue(json);

//write the values to a file
fs.writeFileSync('./sorted-letter-frequency.json', JSON.stringify(values));

// const e = functions.getAllLetterAverage("The Brown Fox Jumps Over The Lazy Dog".toLowerCase().replace(/[^a-z]/g, ''));
// console.log(e);

// console.log(json);

// get the csv file

// let sol = calculateChiSquare(values.o, values.e);
// sol = sol.toFixed(3);

// round to 3 decimal places
// console.log("chi square: " + sol);