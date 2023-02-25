/*
 * @lc app=leetcode id=53 lang=typescript
 *
 * [53] Maximum Subarray
 *
 * https://leetcode.com/problems/maximum-subarray/description/
 *
 * algorithms
 * Medium (50.03%)
 * Likes:    28270
 * Dislikes: 1248
 * Total Accepted:    3M
 * Total Submissions: 6M
 * Testcase Example:  '[-2,1,-3,4,-1,2,1,-5,4]'
 *
 * Given an integer array nums, find the subarray with the largest sum, and
 * return its sum.
 *
 *
 * Example 1:
 *
 *
 * Input: nums = [-2,1,-3,4,-1,2,1,-5,4]
 * Output: 6
 * Explanation: The subarray [4,-1,2,1] has the largest sum 6.
 *
 *
 * Example 2:
 *
 *
 * Input: nums = [1]
 * Output: 1
 * Explanation: The subarray [1] has the largest sum 1.
 *
 *
 * Example 3:
 *
 *
 * Input: nums = [5,4,-1,7,8]
 * Output: 23
 * Explanation: The subarray [5,4,-1,7,8] has the largest sum 23.
 *
 *
 *
 * Constraints:
 *
 *
 * 1 <= nums.length <= 10^5
 * -10^4 <= nums[i] <= 10^4
 *
 *
 *
 * Follow up: If you have figured out the O(n) solution, try coding another
 * solution using the divide and conquer approach, which is more subtle.
 *
 */

// @lc code=start
function maxSubArray(nums: number[]): number {
	if (nums.length === 0) {
		return 0;
	}

	const dp = Array.from({ length: nums.length }, () => 0);

	dp[0] = nums[0];

	for (let i = 1; i < nums.length; i++) {
		dp[i] = Math.max(nums[i], nums[i] + dp[i - 1]);
	}

	let res = -Number.MAX_SAFE_INTEGER;
	for (let i = 0; i < nums.length; i++) {
		res = Math.max(res, dp[i]);
	}

	return res;
}
// @lc code=end

export {};

let res;

res = maxSubArray([5, 4, -1, 7, 8]);
res = maxSubArray([-2, 1, -3, 4, -1, 2, 1, -5, 4]);

res;
