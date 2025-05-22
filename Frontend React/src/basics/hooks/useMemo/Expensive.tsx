import { useState, useMemo } from 'react';

function expensiveCalculation(num: number) {
	console.log('Calculating........');

	let result = 0;
	for (let i = 0; i < 500000; i++) {
		result += i * num;
	}
	return result;
}

const Expensive = () => {
	const [count, setCount] = useState(0);
	const [toggle, setToggle] = useState(true);

	// Currently when we switch toggle , it's calculating the entire expensive result multiple times..
	// to fix this we use useMemo just uncommen the line below and see the difference.

	const result = expensiveCalculation(count);

	// const result = useMemo(() => expensiveCalculation(count), [count]);

	return (
		<>
			<button
				onClick={() => setToggle(!toggle)}
				style={{ backgroundColor: `${toggle ? '#5dade2' : ''}` }}>
				Toggle: {toggle ? 'ON' : 'OFF'}
			</button>

			<button onClick={() => setCount(count + 1)}>Count: {count}</button>
			<div>Result: {result}</div>
		</>
	);
};

export default Expensive;
