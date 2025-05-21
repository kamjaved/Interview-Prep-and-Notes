// Problem Statement:-
// Given an array of integers nums and an integer target, return the indices of the two numbers such
// that they add up to the target. Each input will have exactly one solution, and you may not use the same element twice.

// Input: nums = [2, 7, 11, 15], target = 9
// Output: [0, 1]
// Explanation: nums[0] + nums[1] = 2 + 7 = 9

const aMap = new Map();
aMap.set('name', 'John');
aMap.set('age', 25);

console.log('GET', aMap.get('name'));
console.log('HAS', aMap.has('name'));

const getTwoSumIndex = (nums, target) => {
	const mapOfDigit = new Map(); // [0,2], [1,7]

	for (let i = 0; i < nums.length; i++) {
		let complement = target - nums[i];

		if (mapOfDigit.has(complement)) {
			console.log('RESULT', [mapOfDigit.get(complement), i]);
			return [mapOfDigit.get(complement), i];
		}
		mapOfDigit.set(nums[i], i);
	}
};

const array1 = [2, 7, 11, 15];
const array2 = [3, 2, 4];

getTwoSumIndex(array1, 9);
getTwoSumIndex(array2, 6);

/////////////////////////////////////////////////////////////////
////Below function return exact number instead of index for the Sum
////////////////////////////////////////////////////////////////

const getTwoSumNumber = (nums, target) => {
	const mapOfIndex = new Map();

	for (let i = 0; i < nums.length; i++) {
		let complement = target - nums[i];

		if (mapOfIndex.has(complement)) {
			console.log('RESULT-2', [complement, nums[i]]);
			return [complement, nums[i]];
		}
		mapOfIndex.set(nums[i], i);
	}
};

const array3 = [2, 7, 11, 15];
const array4 = [3, 2, 4];
const string = 'JOHN';
console.log('SPLIT', string.split(''));

getTwoSumNumber(array3, 9);
getTwoSumNumber(array4, 6);

console.log('--REVERSE--', array4.reverse().join('').toString());
