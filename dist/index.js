const dictionaryList = [
    'coucou',
    'hematome',
    'jeux',
    'bougie',
    'telephone',
    'abcdef',
    'cesttretretrelong',
    'abcgef',
];
const longestWord = (s) => {
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
const main = () => {
    console.log(longestWord('abcdefghijkl'));
};
main();
//# sourceMappingURL=index.js.map