import * as fs from 'fs';
import * as path from 'path';

const dictionaryList: string[] = [
  'coucou',
  'chematome',
  'jeux',
  'bougie',
  'telephone',
  'abcdef',
  'cesttretretrelong',
  'abcgef',
];

export type Tree<T> = { [key: string]: Node<T> };
export type Node<T> = T & { children?: Tree<T> };
export interface MySearchable {
  marked: boolean;
  value: string;
  end?: boolean;
  index?: number;
  acc?: string;
  s?: string;
  depth?: number;
}

class TreeFactory {
  static listToTree = (list: string[]): Tree<MySearchable> => {
    const tree: Tree<MySearchable> = {};
    let subtree: Tree<MySearchable>;
    let cursor: Node<MySearchable>;

    list.forEach((word: string, wordIndex) => {
      subtree = tree;
      word.split('').forEach((letter) => {
        subtree[letter] = subtree[letter]
          ? subtree[letter]
          : { marked: false, value: letter, children: {} };
        cursor = subtree[letter];
        subtree = cursor.children;
      });
      cursor.end = true;
      cursor.index = wordIndex;
    });
    return tree;
  };
}

class TreeParser {
  private nodeToVisit: Node<MySearchable>[];
  private currentNode: Node<MySearchable>;

  constructor(tree: Tree<MySearchable>) {
    this.nodeToVisit = Object.values(tree);
  }

  public searchLongestWord = (s: string): string[] => {
    const match: Node<MySearchable>[] = [];
    this.nodeToVisit.forEach((node) => {
      node.depth = 0;
      node.acc = node.value;
      node.s = s;
    });
    while (this.nodeToVisit.length !== 0) {
      const node = this.visitNextNode();
      if (node) {
        match.push(node);
      }
    }
    return match.map((node) => node.acc).sort((a, b) => b.length - a.length);
  };

  private visitNextNode = (): Node<MySearchable> | void => {
    const currentNode = this.nodeToVisit.shift();
    const { value, s, acc, end } = currentNode;
    if (s.includes(value)) {
      const children: Node<MySearchable>[] = Object.values(
        currentNode.children,
      );
      children.forEach((node) => {
        node.s = s.replace(value, '');
        node.acc = `${acc}${node.value}`;
      });
      this.nodeToVisit = [...children, ...this.nodeToVisit];
      if (end) {
        return currentNode;
      }
    } else {
      return;
    }
  };
}

/* class DictionaryTree {
  private tree: Tree<MySearchable> = {};
  constructor(dictionaryList: string[]) {
    this.tree = TreeFactory.listToTree(dictionaryList);

    console.log(JSON.stringify(this.tree));
  }

  deepExplore = (s: string) => {
    const store: string[] = [];
    for (const [key, node] of Object.entries(this.tree)) {
      if (!node.marked) {
        console.log('Exploring subtree %s', key);
        this.explore(node, s, '', store, 0);
      }
    }
    return store;
  };

  explore = (
    node: Node<MySearchable>,
    s: string,
    acc: string,
    store: string[],
    depth: number,
  ) => {
    console.log('Explore node %s - Depth : %s', node.value, depth);
    node.marked = true;
    acc += node.value;
    if (s.includes(node.value)) {
      if (node.end) {
        console.log('Found it');
        console.log(acc);
        store.push(acc);
      }
      for (const [key, child] of Object.entries(node.children)) {
        if (!child.marked) {
          this.explore(child, s.replace(node.value, ''), acc, store, depth + 1);
        }
      }
    } else {
      return;
    }
  };
} */

class TaskWordFinder {
  public longest: string;
  public longestWordFinder(fileName: string, s: string) {
    const data = fs.readFileSync(__dirname + '/' + fileName, 'utf8');
    const dictionaryTree = TreeFactory.listToTree(data.split('\n'));
    const myTreeParser = new TreeParser(dictionaryTree);
    return myTreeParser.searchLongestWord(s);
  }
}

const main = () => {
  const T = new TaskWordFinder();
  const acc = T.longestWordFinder('../test.txt', 'optonoceari');
  console.log(acc.sort((a, b) => b.length - a.length));
};

main();
