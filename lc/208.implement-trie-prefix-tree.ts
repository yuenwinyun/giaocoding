/*
 * @lc app=leetcode id=208 lang=typescript
 *
 * [208] Implement Trie (Prefix Tree)
 */

// @lc code=start
class TrieNode {
	children = new Map<string, TrieNode>();
	isEnd = false;

	constructor() {}
}

class Trie {
	private readonly root = new TrieNode();

	insert(word: string): void {
		let node: TrieNode | undefined = this.root;
		for (const w of word) {
			if (!node?.children.has(w)) {
				node?.children.set(w, new TrieNode());
			}
			node = node?.children.get(w);
		}
		node && (node.isEnd = true);
	}

	search(word: string): boolean {
		let node: TrieNode = this.root;
		for (const w of word) {
			if (node.children.has(w)) {
				node = node.children.get(w)!;
			} else {
				return false;
			}
		}
		return node.isEnd;
	}

	startsWith(prefix: string): boolean {
		let node: TrieNode = this.root;
		for (const w of prefix) {
			if (node.children.has(w)) {
				node = node.children.get(w)!;
			} else {
				return false;
			}
		}
		return true;
	}
}

/**
 * Your Trie object will be instantiated and called as such:
 * var obj = new Trie()
 * obj.insert(word)
 * var param_2 = obj.search(word)
 * var param_3 = obj.startsWith(prefix)
 */
// @lc code=end

// use cases: spell checker, auto complete,
export {};
