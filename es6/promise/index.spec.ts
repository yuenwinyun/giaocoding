type CustomPromiseLike<T> = unknown;

type Executor<T = unknown> = (
	resolver: (result: T | CustomPromiseLike<T>) => void,
	rejector: (reason: any) => void,
) => void;

class CustomPromise<T = unknown> {
	// #thenCbs:

	// Note: things aren't needed to handle in typescript
	// 1. validating executor

	// Note: things are needed to be implemented
	// 1. chaining
	// 2. basic functionalities of a Promise
	constructor(executor: Executor<T>) {
		try {
			executor(this.#onSuccess, this.#onFailed);
		} catch (e) {
			this.#onFailed(e);
		}
	}

	#onSuccess(value: T | CustomPromiseLike<T>) {}

	#onFailed(reason: unknown) {}
}

describe("CustomPromise", () => {
	const OriginalPromise = Promise;
	const MyPromise = CustomPromise;

	it("should be able to use constructor", async () => {
		expect(() => {
			// @ts-ignore
			return new OriginalPromise();
		}).toThrow(Error);

		expect(() => {
			// @ts-ignore
			return new MyPromise();
		}).not.toThrow(Error);

		await expect(() => new OriginalPromise(() => {})).not.toThrowError();
		await expect(() => new MyPromise(() => {})).not.toThrowError();
	});

	it("should be resolved", () => {
		let isResolved = false;
	});

	it("should be rejected", () => {});

	it("should");
});

export {};

// const p = new Promise((re, rj) => {
// 	throw new Error("1");
// });

// const r = async () => {
// 	await p.then(r => r).catch(e => console.log(e));
// }
