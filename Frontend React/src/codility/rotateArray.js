/*
the below function should return array to k no of times. for example 
i have array [3,8,9,7,6] with K =3
[3,8,9,7,6]-->[6,3,8,9,7]
[6,3,8,9,7]-->[7,6,3,8,9]
[7,6,3,8,9]-->[9,7,6,3,8] after 3 rotation
*/

function rotateArray(array, k) {
	for (let i = 0; i < k; i++) {
		if (array.length === 0) return array;

		const lastElement = array.pop();
		array.unshift(lastElement);
	}
	console.log('ROTATED ARRAY', array);
	return array;
}

rotateArray([3, 8, 9, 7, 6], 3);
rotateArray([1, 2, 3, 4], 4);
