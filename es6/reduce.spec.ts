function reduce<Result, Item>(
	arr: Item[],
	callbackFN: (acc: Result, value: Item, index: number) => Result,
	initialValue?: Result,
): Result {
	let result: Result = initialValue;
	for (let i = 0; i < arr.length; i++) {
		result = callbackFN(result, arr[i], i);
	}
	return result;
}

type Result = unknown;
let result: Result;
let nativeResult: Result;
let testCases: any[];

testCases = [1, 2, 3];
const add = (acc: number = 0, v: number) => acc + v;
result = reduce(testCases, add);
nativeResult = testCases.reduce(add);
result;
nativeResult;

function reduceRight<Result, Item>(
	arr: Item[],
	callbackFN: (acc: Result, value: Item, index: number) => Result,
	initialValue?: Result,
): Result {
	let result: Result = initialValue;
	for (let i = arr.length - 1; i >= 0; i--) {
		result = callbackFN(result, arr[i], i);
	}
	return result;
}

result = reduceRight(testCases, add);
// nativeResult = testCases.reduce(add);
result;
// nativeResult;
