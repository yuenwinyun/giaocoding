describe("Promise.all", () => {
	it("should return a list of resolved value", async () => {
		const results = await all([Promise.resolve(1), 2]);
		expect(results).toEqual([1, 2]);
	});

	it("should reject", () => {
		return expect(all([Promise.reject("2")])).rejects.toEqual("2");
	});
});

function all<T extends readonly unknown[] | []>(values: T): Promise<{ -readonly [P in keyof T]: Awaited<T[P]> }> {
	const promiseCount = values.length;
	const results: any = [];
	return new Promise((resolve, reject) => {
		for (let i = 0; i < promiseCount; i++) {
			Promise.resolve(values[i]).then(
				value => {
					results[i] = value;
					if (results.length === promiseCount) {
						resolve(results);
					}
				},
				reason => {
					reject(reason);
				},
			);
		}
	});
}
