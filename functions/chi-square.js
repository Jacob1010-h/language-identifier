/**
 * given a json object of values, calculate the chi square value
 * with the first column being the observed values and the second column
 * being the expected values
 * 
 * the length of the two columns must be equal
 * 
 * @param {Object} values
 */
export function calculateChiSquare(o, e) {
    // check if the lengths are equal
    let chiSquare = 0.0;
    if (o.length !== e.length) {
        throw new Error("chi-square.js : Line 13 -- the length of observed and expected must be equal");
    } else {
        for (let i = 0; i < o.length; i++) {
            chiSquare += Math.pow(o[i] - e[i], 2.0) / e[i];
            console.log("i: " + Math.pow(o[i] - e[i], 2.0) / e[i]);
        }
    }   
    return chiSquare;
}