export function deepClone<T extends {}>(data: T): T {
	if (typeof data === "string") {
		return data;
	}
}

function typeOf<T extends {}>(data: T): string {
	if (typeof data === "object") {
	}
}

let result;

result = deepClone("string data");
result;
result = deepClone(1);
result;
