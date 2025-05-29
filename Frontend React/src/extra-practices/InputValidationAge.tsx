/**Create an age input box and display an error message if the entered age is less than 18.
 */

import { useState } from 'react';

const InputValidationAge = () => {
	const [age, setAge] = useState<string>('');

	const isAdult = age !== '' && Number(age) > 18;

	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setAge(e.target.value);
	};

	return (
		<div>
			<h4 className="mt-5">Please enter your age</h4>
			<input
				className="mt-4 p-4 w-sm text-lg text-amber-50 border border-amber-50 rounded-xl"
				placeholder="You Should be Adult"
				value={age}
				type="number"
				onChange={handleChange}
			/>

			{age !== '' && !isAdult && (
				<p className="mt-1 text-sm text-red-500">
					The age should be more than 18
				</p>
			)}
		</div>
	);
};

export default InputValidationAge;
