export function countSubstrings(s: string): number {
	let count = 0;

	for (let i = 0; i < s.length; i++) {
		let l = i,
			r = i;
		// even
		while (s[l] === s[r] && l >= 0 && r < s.length) {
			count++;
			l--;
			r++;
		}

		l = i;
		r = i + 1;
		// odd
		while (s[l] === s[r] && l >= 0 && r < s.length) {
			count++;
			l--;
			r++;
		}
	}

	return count;
}

let result = countSubstrings('abc');

result;
