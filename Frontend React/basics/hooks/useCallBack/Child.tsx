//Hooks like useCallback only prevent re-renders of child components when combined with React.memo.
// Without React.memo, the Child will re-render anyway, even if the function reference is memoized —
// because React doesn't do shallow prop comparisons by default in functional components.
// what react.memo does is it performs a shallow comparison of the props. If the props haven't changed (by reference for objects and functions,
// by value for primitives), the component will skip re-rendering.

import React from 'react';

const Child = React.memo(({ onClick }: { onClick: () => void }) => {
	console.log('Child rendered');
	return <button onClick={onClick}>Child Button</button>;
});

export default Child;
