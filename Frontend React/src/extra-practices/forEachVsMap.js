/* They are not one and the same. Let me explain the difference.

forEach: This iterates over a list and applies some operation with side effects to each list member 
(example: saving every list item to the database) and does not return anything. Also it doesn’t ittirates over uninitialized value.

map: This iterates over a list, transforms each member of that list, and returns another list of the same size with the transformed members 
(example: transforming list of strings to uppercase). It does not mutate the actual array on which it is called (although the callback function may do so).

*/

const nums = [1, 2, 3];

const doubled = nums.map((n) => n * 2); // [2, 4, 6]
console.log(nums, doubled); // it will return [ 1, 2, 3 ] [ 2, 4, 6 ]

const numsForEach = nums.forEach((n) => n * 2); // Logs: 2, 4, 6
console.log(nums, numsForEach); //it will return [ 1, 2, 3 ] undefined (as it return notihng that why numForEach doesn't have anything)
