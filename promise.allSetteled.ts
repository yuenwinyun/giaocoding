function allSettled(promises: Promise<unknown>[]): Promise<unknown> {
	return Promise.all(promises.map((p) => p.then((res) => res).catch((reason) => reason)));
}

let testCases = [
	new Promise((_, reject) => reject("error")),
	new Promise((resolve, _) => resolve("resolve 1")),
	new Promise((resolve, _) => resolve("resolve 2")),
];

allSettled(testCases)
	.then((r) => {
		r;
	})
	.catch((e) => {
		e;
	});

Promise.all(testCases)
	.then((r) => {
		r;
	})
	.catch((e) => {
		e;
	});

export {};
