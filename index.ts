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

const longestWord = (s: string): string => {
  /* Check that s has at most 12 letters from A*/
  let longest = '';
  for (const word of dictionaryList) {
    //Pass trivial cases
    if (longest.length === 12) break;
    if (word.length > 12) continue;
    if (longest && word.length <= longest.length) continue;

    let copy = s;
    for (let i = 0; i < word.length; i++) {
      const char = word.charAt(i);
      //Pass trivial cases where the word cannot be a subset of the of s;
      if (copy.includes(char)) {
        copy = copy.replace(char, '');
      } else {
        break;
      }
      //If last iteration
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
