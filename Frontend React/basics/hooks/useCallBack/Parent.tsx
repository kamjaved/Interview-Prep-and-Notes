import { useState, useCallback } from 'react';
import Child from './Child';

const Parent = () => {
	const [count, setCount] = useState(0);
	const [label, setLabel] = useState('');

	// Problem:
	//Even if count changes, and not the function, Child re-renders.

	// Why?
	// Because on every render of Parent, a new instance of handleClick is created (function is redefined),
	// so React thinks the prop onClick changed.

	// ✅ Memoize the function so it doesn't recreate every render
	const handleClick = useCallback(() => {
		console.log(`Clicked with Label: ${label}`);
	}, [label]);

	return (
		<>
			<button onClick={() => setCount(count + 1)}>Increment: {count}</button>
			<input
				value={label}
				onChange={(e) => setLabel((e.target as HTMLInputElement).value)}
			/>
			<Child onClick={handleClick} />
		</>
	);
};

export default Parent;
