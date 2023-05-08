class DoublyNode {
	next: DoublyNode | null = null;
	pre: DoublyNode | null = null;

	constructor(public key: string | number, public value: any) {}
}

class DoublyList {
	private head: DoublyNode;
	private tail: DoublyNode;
	private size: number;

	constructor() {
		this.head = new DoublyNode(0, 0);
		this.tail = new DoublyNode(0, 0);
		this.head.next = this.tail;
		this.tail.pre = this.head;
		this.size = 0;
	}

	addFirst(node: DoublyNode): void {
		node.pre = this.head;
		node.next = this.head.next;
		if (this.head.next) {
			this.head.next.pre = node;
		}
		this.head.next = node;
		this.size++;
	}

	removeLast() {
		if (this.head.next === this.tail) return null;
		const last = this.tail.next;

		if (last.prev) {
		}
	}
}

class LRUCache {}

class LFUCache {}

describe("LRUCache", () => {
	it("should able to create new", () => {
		const lruCache = new LRUCache();

		expect(lruCache).not.toEqual({});
	});
});

describe("LFUCache", () => {});

export {};
