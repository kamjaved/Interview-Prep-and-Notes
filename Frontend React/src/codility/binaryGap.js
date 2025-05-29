// write a functoin to return the maximum difference of gap between 2 ones.
// for example number 1041 have binary of 10000010001 so the 2 binary gap is 5 & 3 and  it will return 5 as its the longest binary gap.

function getBinaryGap(number) {
	const numToBinaryString = number.toString(2).replace(/0+$/, ''); // it will conver number to binary string and remove trailing zeros
	const parts = numToBinaryString.split('1');
	let maxGap = 0;

	for (let i = 1; i < parts.length; i++) {
		maxGap = Math.max(maxGap, parts[i].length);
	}

	console.log(maxGap);
	return maxGap;
}

getBinaryGap(529); // binary 1000010001 return 4
getBinaryGap(15); //binary 100000 return 0
getBinaryGap(20); // binary 10100 return 1
