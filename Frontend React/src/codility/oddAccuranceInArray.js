// A non-empty array A consisting of N integers is given. The array contains an odd number of elements,
// and each element of the array can be paired
// with another element that has the same value, except for one element that is left unpaired.

// For example, in array A such that:

// A[0] = 9 A[1] = 3 A[2] - 9
// A[3] = 3 A[4] = 9 A[5] - 7
// A[6] = 9

// the elements at indexes 0 and 2 have value 9,
/// the elements at indexes 1 and 3 have value 3,
// the elements at indexes 4 and 6 have value 9,
// the element at index 5 has value 7 and is unpaired.
//

const oddOccuranceInArray = (array) => {
	let unpaired = 0;
	for (let digit of array) {
		unpaired = unpaired ^ digit;
	}

	// console.log('UNPAIRED DIGIT', unpaired);

	return unpaired;
};

oddOccuranceInArray([9, 3, 9, 3, 9, 7, 9]); // returns 7

/* Bit 1  Bit 2  Bit1 XOR Bit2
   0       0           0
   0       1           1
   1       0           1
   1       1           1


Basic Simple Examples:
Let's work with small numbers and their binary representations Cassuming 8-bit for clarity, though the concept applies to any number of bits):

Example 1: XORing two different bits

Decimal 5: 00000101 (binary) 
Decimal 3: 00000011 (binary)

  00000101 
^ 00000011
------------

00000110 (Decimal 6) 
Breaking it down bit by bit:

Rightmost bit: 1 XOR 1= 0 
Second bit from right: O XOR 1 = 1 
Third bit from right: 1 XOR 0 = 1 A
ll other bits (0 XOR 0) remain 0.


Example 2: XORing two identical bits

Decimal 7: 00000111 (binary) 
Decimal 7: 00000111 (binary) 

 00000111 
^00000111
-----------------
0000000 (Decimal 0)

Here, every corresponding bit is the same, so the result of the XOR is always 0.

Example 3: XORing with 0
Decimal 12: 00001100 (binary) 
Decimal 0: 00000000 (binary)
I
00001100 
00000000
-----------
O0001100 (Decimal 12)
*/

//////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////
// suppose a array=[2,2,1,1,7] t will return 2 & 7
// another example  a array=[2,3,1,2,3] t will return 2 & 3
/////////////////////////////////////////////////////////////////

function findDuplicatesNumberInArray(array) {
	const seenNumbers = new Set(); // To track numbers we've seen at least once
	const duplicates = new Set(); // To track numbers that are indeed duplicates

	for (let digit of array) {
		// If we've seen this number before, it's a duplicate
		if (seenNumbers.has(digit)) {
			duplicates.add(digit);
		} else {
			// If we haven't seen it, mark it as seen
			seenNumbers.add(digit);
			duplicates;
		}
	}
	// Convert the Set of duplicates back into an array
	return Array.from(duplicates);
}

// --- Test Cases ---
console.log('Example 1:', findDuplicatesNumberInArray([2, 3, 1, 2, 3])); // Expected: [2, 3] (order may vary)
console.log('Example 2:', findDuplicatesNumberInArray([2, 2, 1, 1, 7])); // Expected: [2, 1] (order may vary)
console.log('Example 3:', findDuplicatesNumberInArray([1, 2, 3, 4, 5])); // Expected: []
console.log('Example 4:', findDuplicatesNumberInArray([5, 5, 5, 5])); // Expected: [5]
console.log('Example 5:', findDuplicatesNumberInArray([])); // Expected: []
console.log('Example 6:', findDuplicatesNumberInArray([1, 1, 1, 2, 2, 3])); // Expected: [1, 2]
