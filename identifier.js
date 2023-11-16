import { calculateChiSquare } from "./functions/chi-square.js";
import * as functions from './functions/functions.js';

import * as fs from 'fs';

const file = './letter-frequency.json';

var json = JSON.parse( fs.readFileSync(file, 'utf8') );

console.log(json);

// get the csv file

// let sol = calculateChiSquare(values.o, values.e);
// sol = sol.toFixed(3);

// round to 3 decimal places
// console.log("chi square: " + sol);