export function deepClone<T extends {}>(data: T): T {
	if (typeof data === 'string') {
		return data;
	}
}

function typeOf<T extends {}>(data: T): string {
	if (typeof data === 'object') {
	}
}
