//You are given two non-empty linked lists representing two non-negative integers. The digits are stored in reverse order,
// and each of their nodes contains a single digit. Add the two numbers and return the sum as a linked list.

// Input: l1 = [2,4,3], l2 = [5,6,4]
// Output: [7,0,8]
// Explanation: 342 + 465 = 807.
// Example 2:

// Input: l1 = [0], l2 = [0]
// Output: [0]
// Example 3:

// Input: l1 = [9,9,9,9,9,9,9], l2 = [9,9,9,9]
// Output: [8,9,9,9,0,0,0,1]

const addTwoNumbers = function (l1, l2) {
	let result;

	if (l1.length == 0 && l2.length == 0) return [0];
	else if (l1.length > 0 && l2.length > 0) {
		const l1Reverse = l1.reverse().join('').toString();
		const l2Reverse = l2.reverse().join('').toString();
		console.log('L2', l2Reverse);
		sumOfL1L2 = parseInt(l1Reverse) + parseInt(l2Reverse);
		result = Array.from(String(sumOfL1L2), Number).reverse();

		console.log('RESULT', result);
	}
	return result;
};

addTwoNumbers([2, 4, 3], [5, 6, 4]);
