describe("Promise.race", () => {
	it("should return a list of resolved value", async () => {
		const results = await race([Promise.resolve(2), new Promise(r => setTimeout(() => r(1), 1000))]);
		expect(results).toEqual(2);
	});

	it("should reject", () => {
		return expect(race([Promise.reject("2")])).rejects.toEqual("2");
	});
});

function race<T extends readonly unknown[] | []>(values: T): Promise<unknown> {
	const promiseCount = values.length;
	const results: any = [];
	return new Promise((resolve, reject) => {
		for (let i = 0; i < promiseCount; i++) {
			Promise.resolve(values[i]).then(
				value => {
					resolve(value);
				},
				reason => {
					reject(reason);
				},
			);
		}
	});
}
