import * as fs from 'fs';
import { MySearchable, Tree, TreeFactory, TreeParser } from './tree';

class TaskWordFinder {
  public longest: string;
  private dictionaryTree: Tree<MySearchable>;
  private dictionary: string[];

  constructor(fileName: string) {
    const data = fs.readFileSync(__dirname + '/' + fileName, 'utf8');
    this.dictionary = data.split('\n');
    this.dictionaryTree = TreeFactory.listToTree(this.dictionary);
  }
  public longestWordFinder(s: string): void {
    const myTreeParser = new TreeParser(this.dictionaryTree);
    const node = myTreeParser.searchLongestWord(s);
    this.longest = this.dictionary[node.index];
  }
}

const main = () => {
  const taskWordFinder = new TaskWordFinder('../test.txt');
  taskWordFinder.longestWordFinder('optonoceari');
  console.log(taskWordFinder.longest);
  taskWordFinder.longestWordFinder('jtgomelarih');
  console.log(taskWordFinder.longest);
  taskWordFinder.longestWordFinder('pmeornoia');
  console.log(taskWordFinder.longest);
  taskWordFinder.longestWordFinder('rpneruhpishant');
  console.log(taskWordFinder.longest);
};

main();
