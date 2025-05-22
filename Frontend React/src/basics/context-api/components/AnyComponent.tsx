// AnyComponent.jsx
import React from 'react';
import { useTheme } from '../ThemeContext';

const AnyComponent = () => {
	console.log('ANY RENDERED');

	const { theme, toggleTheme } = useTheme();

	return (
		<div className="mt-5 ">
			<p
				className={`w-64 p-4 rounded ${
					theme === 'dark'
						? 'bg-gray-900 text-white'
						: 'bg-amber-50 text-black'
				}`}>
				Current theme is: {theme}
			</p>
			<button
				className="p-2 m-2 rounded-2xl w[20px] bg-blue-500 cursor-pointer transition-colors duration-300 ease-in hover:bg-blue-600"
				onClick={toggleTheme}>
				Toggle Theme
			</button>
		</div>
	);
};

export default AnyComponent;
