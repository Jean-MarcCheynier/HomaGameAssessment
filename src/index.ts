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

export type Tree = { [key: string]: Node };

export type Node = {
  marked: boolean;
  value: string;
  end: boolean;
  children?: Tree;
};

class DictionaryTree {
  private tree: Tree = {};
  constructor(dictionaryList: string[]) {
    this.initTree(dictionaryList);

    console.log(JSON.stringify(this.tree));
  }

  private initTree = (dictionaryList: string[]): void => {
    dictionaryList.forEach((item) => {
      let cursor = this.tree;
      item.split('').forEach((char, index) => {
        cursor[char] = {
          value: char,
          children: {},
          ...cursor[char],
        };
        const isEnd = item.length - 1 === index;
        if (isEnd) cursor[char].end = true;

        cursor = cursor[char].children;
      });
    });
  };

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
    node: Node,
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
}

class TaskWordFinder {
  public longest: string;
  public longestWordFinder(fileName: string, s: string) {
    const data = fs.readFileSync(__dirname + '/' + fileName, 'utf8');
    const D = new DictionaryTree(data.split('\n'));
    const acc = D.deepExplore(s);
    return acc;
  }
}

const main = () => {
  const T = new TaskWordFinder();
  const acc = T.longestWordFinder('../test.txt', 'optonoceari');
  console.log(acc.sort((a, b) => b.length - a.length));
};

main();
