const throttle = (fn: (...args: any[]) => any, ms: number) => {
	let timer: null | NodeJS.Timeout = null;

	return (...args: any[]) => {
		if (timer !== null) return;

		timer = setTimeout(() => {
			fn(...args);
			timer = null;
		}, ms);
	};
};

describe("throttle", () => {
	beforeAll(() => {
		jest.useFakeTimers();
	});

	it("should have original functionality", () => {
		let result = 0;
		const originalFunc = () => {
			result = 1;
		};
		const throttledFunc = throttle(originalFunc, 100);
		originalFunc();
		expect(result).toBe(1);
		result = 0;
		throttledFunc();
		jest.runAllTimers();
		expect(result).toBe(1);
	});
});

const debounce = (fn: (...args: any[]) => any, ms: number) => {
	let timer: null | NodeJS.Timeout = null;
	return (...args: any[]) => {
		if (timer !== null) {
			clearTimeout(timer);
			timer = null;
		}

		timer = setTimeout(() => {
			fn(...args);
			timer = null;
		}, ms);
	};
};

describe("debounce", () => {
	beforeAll(() => {
		jest.useFakeTimers();
	});

	it("should have original functionality", () => {
		let result = 0;
		const originalFunc = () => {
			result = 1;
		};
		const debouncedFunc = debounce(originalFunc, 100);
		originalFunc();
		expect(result).toBe(1);
		result = 0;
		debouncedFunc();
		jest.runAllTimers();
		expect(result).toBe(1);
	});
});

export {};
