describe('deepClone', () => {
	it('should ok', () => {
		const obj = { name: 'name', age: { n: 1 } };

		expect(deepClone(obj)).toEqual(obj);
	});
});

export function deepClone<T extends {}>(data: T): T {
	if (typeof data === 'string') {
		return data;
	}
	return { ...data };
}
