/**
 * Will get the count of each letter in a string and return an object with the count of each letter
 * 
 * @param {String} string 
 * @returns {Object} the count of each letter in the string
 */
export function getLetterCount(string) {
    const letters = string.split('');
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
 * Gets the letter average of a character in a string, which will call @see getLetterCount()
 * 
 * @param {String} string 
 * @param {char} letter 
 * @returns {double} the average of the letter in the string
 */
export function getLetterAverage(string, letter) {
    const letterCount = getLetterCount(string);
    const letterTotal = letterCount[letter];
    return letterTotal / string.length;
}

/**
 * Gets the letter average of a character in a string, given the function @see getLetterCount()
 * 
 * @param {String} string 
 * @param {char} letter 
 * @param {getLetterCount()} letterCount
 * @returns {double} the average of the letter in the string
 */
export function _getLetterAverage(string, letter, letterCount) {
    const letterTotal = letterCount[letter];
    return letterTotal / string.length;
}

/**
 * Will get the letter average of each letter in a string, which will call @see getLetterAverage()
 * 
 * //TODO: stop o^2 complexity by not looping through the string twice @see getLetterCount()
 * 
 * @param {String} string 
 * @returns {Object} the average of each letter in the string
 */
export function getAllLetterAverage(string) {
    const letterCount = getLetterCount(string);
    const letterAverage = {};

    letterCount.forEach(letter => {
        letterAverage[letter] = getLetterAverage(string, letter, letterCount);        
    });

    return letterAverage;
}