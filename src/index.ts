import * as fs from 'fs';

export type Tree<T> = T & { children: Tree<T>[] };

export interface MySearchable {
  marked?: boolean;
  value?: string;
  end?: boolean;
  index?: number;
  acc?: string;
  s?: string;
  depth?: number;
  depthMax?: number;
}

const byLength = (a: string, b: string) => b.length - a.length;
const sortString = (s: string) => s.split('').sort().join('');

class TreeFactory {
  static listToTree = (list: string[]): Tree<MySearchable> => {
    const tree: Tree<MySearchable> = { value: 'INIT', depth: 0, children: [] };
    let cursor: Tree<MySearchable>;

    list.sort(byLength).forEach((word: string, wordIndex) => {
      cursor = tree;
      word = sortString(word);
      word.split('').forEach((letter, index) => {
        const node: Tree<MySearchable> = cursor.children.find(
          (item) => item.value === letter,
        );
        if (node) {
          cursor = node;
        } else {
          cursor.children.push({
            marked: false,
            value: letter,
            depth: index + 1,
            children: [],
          });
          cursor = cursor.children[cursor.children.length - 1];
        }
        cursor.depthMax =
          cursor.depthMax > word.length ? cursor.depthMax : word.length;
      });
      cursor.end = true;
      cursor.index = wordIndex;
    });
    return tree;
  };
}

class TreeParser {
  private tree: Tree<MySearchable>;
  private nodeToVisit: Tree<MySearchable>[];
  private longuest: Tree<MySearchable>;

  constructor(tree: Tree<MySearchable>) {
    this.tree = tree;
  }

  public refresh = () => {
    this.nodeToVisit = [];
    this.longuest = { depth: 0, children: [] };
    this.nodeToVisit = [...this.tree.children];
  };

  public searchLongestWord = (s: string): Tree<MySearchable> => {
    this.refresh();
    this.nodeToVisit.forEach((node) => {
      node.s = s;
    });
    while (this.nodeToVisit.length !== 0) {
      const node = this.visitNextNode();
      if (node) {
        this.longuest = node;
      }
    }
    return this.longuest;
  };

  private visitNextNode = (): Tree<MySearchable> | void => {
    const currentNode = this.nodeToVisit.shift();
    const { value, s, end, depth, depthMax, index } = currentNode;

    if (this.longuest && this.longuest.depth >= depthMax) {
      return;
    }
    if (s.includes(value)) {
      const children: Tree<MySearchable>[] = currentNode.children;
      children.forEach((node) => {
        node.s = s.replace(value, '');
      });
      this.nodeToVisit = [...children, ...this.nodeToVisit];
      if (end) {
        if (this.longuest.depth < depth) {
          return currentNode;
        }
      }
    }
    return;
  };
}

class TaskWordFinder {
  public longest: string;
  private dictionaryTree: Tree<MySearchable>;
  private dictionary: string[];

  constructor(fileName: string) {
    const data = fs.readFileSync(__dirname + '/' + fileName, 'utf8');
    this.dictionary = data.split('\n');
    this.dictionaryTree = TreeFactory.listToTree(this.dictionary);
    console.log(this.dictionary.includes('algorithm'));
  }
  public longestWordFinder(s: string): void {
    const myTreeParser = new TreeParser(this.dictionaryTree);
    const node = myTreeParser.searchLongestWord(s);
    this.longest = this.dictionary[node.index];
    console.log(node.index);
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
