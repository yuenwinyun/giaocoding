describe("allSettled", () => {
	it("ok", async () => {
		const testCases = [
			new Promise((_, reject) => reject("error")),
			new Promise((resolve, _) => resolve("resolve 1")),
			new Promise((resolve, _) => resolve("resolve 2")),
		];
		expect(await allSettled(testCases)).toEqual(["error", "resolve 1", "resolve 2"]);
	});
});

function allSettled(promises: Promise<unknown>[]): Promise<unknown> {
	return Promise.all(promises.map(p => p.then(res => res).catch(reason => reason)));
}
