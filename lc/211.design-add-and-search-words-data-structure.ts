/*
 * @lc app=leetcode id=211 lang=typescript
 *
 * [211] Design Add and Search Words Data Structure
 *
 * https://leetcode.com/problems/design-add-and-search-words-data-structure/description/
 *
 * algorithms
 * Medium (42.96%)
 * Likes:    5818
 * Dislikes: 341
 * Total Accepted:    465.9K
 * Total Submissions: 1.1M
 * Testcase Example:  '["WordDictionary","addWord","addWord","addWord","search","search","search","search"]\n' +
  '[[],["bad"],["dad"],["mad"],["pad"],["bad"],[".ad"],["b.."]]'
 *
 * Design a data structure that supports adding new words and finding if a
 * string matches any previously added string.
 * 
 * Implement the WordDictionary class:
 * 
 * 
 * WordDictionary() Initializes the object.
 * void addWord(word) Adds word to the data structure, it can be matched
 * later.
 * bool search(word) Returns true if there is any string in the data structure
 * that matches word or false otherwise. word may contain dots '.' where dots
 * can be matched with any letter.
 * 
 * 
 * 
 * Example:
 * 
 * 
 * Input
 * 
 * ["WordDictionary","addWord","addWord","addWord","search","search","search","search"]
 * [[],["bad"],["dad"],["mad"],["pad"],["bad"],[".ad"],["b.."]]
 * Output
 * [null,null,null,null,false,true,true,true]
 * 
 * Explanation
 * WordDictionary wordDictionary = new WordDictionary();
 * wordDictionary.addWord("bad");
 * wordDictionary.addWord("dad");
 * wordDictionary.addWord("mad");
 * wordDictionary.search("pad"); // return False
 * wordDictionary.search("bad"); // return True
 * wordDictionary.search(".ad"); // return True
 * wordDictionary.search("b.."); // return True
 * 
 * 
 * 
 * Constraints:
 * 
 * 
 * 1 <= word.length <= 25
 * word in addWord consists of lowercase English letters.
 * word in search consist of '.' or lowercase English letters.
 * There will be at most 3 dots in word for search queries.
 * At most 10^4 calls will be made to addWord and search.
 * 
 * 
 */

// @lc code=start
class TrieNode {
	children = new Map<string, TrieNode>();
	isEnd = false;
}

class WordDictionary {
	root = new TrieNode();

	addWord(word: string): void {
		let node = this.root;
		for (const w of word) {
			const hasNode = !!node.children.has(w);
			if (!hasNode) node.children.set(w, new TrieNode());
			node = node.children.get(w)!;
		}
		node.isEnd = true;
	}

	search(word: string, node = this.root): boolean {
		let cur: string | undefined;
		let wordList = word.split("");
		while ((cur = wordList.shift())) {
			if (cur === ".") {
				for (const [_, m] of node.children) {
					if (this.search(wordList.join(""), m)) {
						return true;
					}
				}
				return false;
			} else if (!node.children.has(cur)) {
				return false;
			} else {
				node = node.children.get(cur)!;
			}
		}
		return node.isEnd;
	}
}

/**
 * Your WordDictionary object will be instantiated and called as such:
 * var obj = new WordDictionary()
 * obj.addWord(word)
 * var param_2 = obj.search(word)
 */
// @lc code=end

export {};
