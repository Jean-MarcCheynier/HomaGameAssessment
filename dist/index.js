"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const fs = require("fs");
const path = require("path");
const defaultDictionaryList = [
    'coucou',
    'hematome',
    'jeux',
    'bougie',
    'telephone',
    'abcdef',
    'cesttretretrelong',
    'abcgef',
];
const longestWord = (s, dictionaryList = defaultDictionaryList) => {
    let longest = '';
    for (const word of dictionaryList) {
        if (longest.length === 12)
            break;
        if (word.length > 12)
            continue;
        if (longest && word.length <= longest.length)
            continue;
        let copy = s;
        for (let i = 0; i < word.length; i++) {
            const char = word.charAt(i);
            if (copy.includes(char)) {
                copy = copy.replace(char, '');
            }
            else {
                break;
            }
            if (i === word.length - 1) {
                longest = word;
            }
        }
    }
    return longest;
};
class TaskWordFinder {
    longestWordFinder(fileName, s) {
        const data = fs.readFileSync(fileName, 'utf8');
        this.longest = longestWord(s, data.split('\n'));
    }
}
const main = () => {
    const T = new TaskWordFinder();
    T.longestWordFinder(path.resolve(__dirname, '../test.txt'), 'optonoceari');
    console.log(T.longest);
};
main();
//# sourceMappingURL=index.js.map