/*
 * @lc app=leetcode id=125 lang=typescript
 *
 * [125] Valid Palindrome
 *
 * https://leetcode.com/problems/valid-palindrome/description/
 *
 * algorithms
 * Easy (43.47%)
 * Likes:    6018
 * Dislikes: 6643
 * Total Accepted:    1.8M
 * Total Submissions: 4.1M
 * Testcase Example:  '"A man, a plan, a canal: Panama"'
 *
 * A phrase is a palindrome if, after converting all uppercase letters into
 * lowercase letters and removing all non-alphanumeric characters, it reads the
 * same forward and backward. Alphanumeric characters include letters and
 * numbers.
 *
 * Given a string s, return true if it is a palindrome, or false otherwise.
 *
 *
 * Example 1:
 *
 *
 * Input: s = "A man, a plan, a canal: Panama"
 * Output: true
 * Explanation: "amanaplanacanalpanama" is a palindrome.
 *
 *
 * Example 2:
 *
 *
 * Input: s = "race a car"
 * Output: false
 * Explanation: "raceacar" is not a palindrome.
 *
 *
 * Example 3:
 *
 *
 * Input: s = " "
 * Output: true
 * Explanation: s is an empty string "" after removing non-alphanumeric
 * characters.
 * Since an empty string reads the same forward and backward, it is a
 * palindrome.
 *
 *
 *
 * Constraints:
 *
 *
 * 1 <= s.length <= 2 * 10^5
 * s consists only of printable ASCII characters.
 *
 *
 */

// @lc code=start
function isPalindrome(s: string): boolean {
	let start = 0;
	let end = s.length - 1;
	while (start < end) {
		if (!isValidString(s[start])) {
			start++;
			continue;
		}

		if (!isValidString(s[end])) {
			end--;
			continue;
		}

		if (s[start].toLowerCase() !== s[end].toLowerCase()) {
			return false;
		}

		start++;
		end--;
	}
	return true;
}

function isValidString(s: string): boolean {
	return (s >= "a" && s <= "z") || (s >= "A" && s <= "Z") || (s >= "0" && s <= "9");
}
// @lc code=end

export {};

let res = isPalindrome("A man, a plan, a canal: Panama");
res;
res = isPalindrome("race a car");
res;
res = isPalindrome(" ");
res;
