# Homagames assessment
## Scrabble like solver

### Description:   
Find in this repository two branches with ideas of scrabble solvers :

* **Raw** contains a straight forward iterative implementation ( done in ~50min ):
  * Read the file and sort the word by length
  * Iterate over the words and check if they can be generated 
* **DictionaryTree [main]** contains a more complex implementation using a tree structure to represents the dictionary ( done in 4h including some readings ) : 
  * Read the file and sort the word by length
  * Rewrite the dictionary in a tree structure, each nodes representing a letter of a word. Each path from the summit to a terminal node representing a word. 
  * Parse the tree to find the longest word for a given squence of characters.

I added some console output to display the timing of the function *'longestWordFinder()'* in both case. The implementation present in DictionaryTree is 8 times faster than Raw on my machine ( ~4.5ms for Raw, ~0.6ms for DictionaryTree). However the instaciation of the tree structure adds a fixed cost at the initialisation of the script ( *TreeFactory.dictToTree()*).

### Requirements:  
Node 16.13.1 or later

### How to run:  
run `yarn` to install the dependencies
run  `yarn build` to build the project ( outdir file is *./dist*)
run `yarn start` to run the script ( the script will take *'test.txt'* as dictionary and *'optonoceari'* as a char sequence)

