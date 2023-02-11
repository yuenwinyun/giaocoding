class PromiseImpl<T = unknown> {
	#state: "pending" | "fulfilled" | "rejected";

	constructor(executor: (resolver: (value: T) => void, reject: (reason: Error) => void) => void) {
		this.#state = "pending";
	}

	#changeState() {
		if (this.#state !== "pending") {
			return;
		}
	}

	then() {}
}

describe("PromiseImpl", () => {
	it("ok", () => {
		const promise = new PromiseImpl(() => {});
		expect(typeof promise).toBe(typeof new Promise(() => {}));
		expect(promise.then).toEqual(expect.any(Function));
	});
});
