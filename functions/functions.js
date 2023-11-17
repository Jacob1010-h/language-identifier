export function removeWhitespaceAndCaps(str) {
    let returnString = str.replace(/\s/g, '');
    returnString = returnString.toLowerCase();
    return returnString;
}

/*
    the obj parameter is an object with keys and values
    with each value being another object with keys and values

    this function will sort the values of the inner objects
*/
export function sortAllObjectsByValue(arr) {
    let hashMap = Object.values(Object.entries(arr));
    
    arr.sort((a, b) => {
        return Object.values(hashMap[a]) - Object.values(hashMap[b]);
    });

    return arr;
}


/**
 * Will get the count of each letter in a string and return an object with the count of each letter
 * 
 * @param {String} str 
 * @returns {Object} the count of each letter in the string
 */
export function getLettersCount(str) {
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

/**
 * Gets the letter average of a character in a string, which will call @see getLettersCount()
 * 
 * @param {String} str 
 * @param {char} letter 
 * @returns {double} the average of the letter in the string
 */
export function getLetterAverage(str, letter) {
    const newString = removeWhitespaceAndCaps(str);
    const letterCount = getLettersCount(newString);
    const letterTotal = letterCount[letter];
    return letterTotal / newString.length;
}

/**
 * Gets the letter average of a character in a string, given the function @see getLettersCount()
 * 
 * @param {String} str 
 * @param {char} letter 
 * @param {getLetterCount()} letterCount
 * @returns {double} the average of the letter in the string
 */
export function _getLetterAverage(str, letter, letterCount) {
    const newString = removeWhitespaceAndCaps(str);
    const letterTotal = letterCount[letter];
    return letterTotal / newString.length;
}

/**
 * Will get the letter average of each letter in a string, which will call @see getLetterAverage()
 * 
 * //TODO: stop o^2 complexity by not looping through the string twice @see getLettersCount()
 * 
 * @param {String} str 
 * @returns {Object} the average of each letter in the string
 */
export function getAllLetterAverage(str) {
    const newString = removeWhitespaceAndCaps(str);
    var letterCount = Object.keys(getLettersCount(newString));
    let letterAverage = {};

    letterCount.forEach(letter => {
        letterAverage[letter] = getLetterAverage(newString, letter, letterCount);        
    });

    return letterAverage;
}