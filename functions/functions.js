function getLetterFrequencies(str) {
    let map = { };
    // count the number of times each letter appears
    for (let i = 0; i < str.length; i++) {
        if (map[str[i]]) {
            map[str[i]]++;
        } else {
            map[str[i]] = 1;
        }
    }
    return map;
}

function getLetterAverages(map) {
    // divide each letter by the length of the string
    for (let key in map) {
        map[key] /= str.length;
    }
    return map;
}

export function getLetterAveragesByString(str) {
    let map = getLetterFrequencies(str);
    return getLetterAverages(map);
}

/*
    {
        letter: {}
        Language: {} ...
    }
*/
export function getLetterMapByLanguage(map, language) {
    let letterMap = { };
    for (let i = 0; i < map.length; i++) {
        console.log("Letter: " + map[i].Letter + "; Frequency: " + map[i][language]);
    }
    return letterMap;
}