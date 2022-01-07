import * as fs from 'fs';
import * as path from 'path';

const dictionaryList: string[] = [
  'coucou',
  'hematome',
  'jeux',
  'bougie',
  'telephone',
  'abcdef',
  'cesttretretrelong',
  'abcgef',
];

const longestWord = (s: string, list = dictionaryList): string => {
  if (s.length > 12) throw new Error('s should not exceed 12 letters');
  if (!/^[a-zA-Z]+$/.test(s)) {
    throw new Error('s should only contain letters from the latin alphabet');
  }

  const sortedList = list.sort((a, b) => b.length - a.length);

  for (const word of sortedList) {
    if (word.length > 12) continue;

    let copy = s;
    for (let i = 0; i < word.length; i++) {
      const char = word.charAt(i);
      if (copy.includes(char)) {
        copy = copy.replace(char, '');
      } else {
        break;
      }

      if (i === word.length - 1) {
        return word;
      }
    }
  }
  return;
};

class TaskWordFinder {
  public longest: string;
  public longestWordFinder(fileName: string, s: string) {
    const data = fs.readFileSync(fileName, 'utf8');
    console.log(data);
    this.longest = longestWord(s, data.split('\n'));
  }
}

const main = () => {
  const T = new TaskWordFinder();
  T.longestWordFinder(path.resolve(__dirname, '../test.txt'), 'optonoceari');
  console.log(T.longest);
};

main();
