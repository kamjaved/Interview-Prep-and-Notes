import { useEffect, useRef, useState } from 'react';

const OtpInput = ({ otplength }: { otplength: number }) => {
	const otpInputField = new Array(otplength).fill('');

	const inputRef = useRef<HTMLInputElement[]>([]);

	const [otp, setOtp] = useState<string[]>(otpInputField);

	useEffect(() => {
		inputRef.current[0]?.focus();
		// inputRefText.current?.focus();
	}, []);

	const handleChange = (
		e: React.ChangeEvent<HTMLInputElement>,
		index: number
	) => {
		const { value } = e.target;

		// Check if the e.target.value is alphanumeric and not a number then return notihng
		if (!/^\d$/.test(value)) {
			return; // If not a digit, do nothing
		}

		const newOtp = [...otp];
		newOtp[index] = value;
		setOtp(newOtp);

		// Automatically move focus to the next input if a digit is entered
		if (value.length > 0 && index < otplength - 1) {
			inputRef.current[index + 1]?.focus();
		}
	};

	//--BACKSPACE & LEFT /RIGHT KEY PRESS HANDLEING----------

	const handleKeyDown = (e: React.KeyboardEvent, index: number) => {
		if (e.key === 'Backspace') {
			e.preventDefault();
			const newOtp = [...otp];

			// Scenario 1: Current input field has a value
			if (otp[index] !== '') {
				newOtp[index] = ''; // Clear the current input
				setOtp(newOtp);
				// Keep focus on the current input after clearing its value
				inputRef.current[index]?.focus();
			}
			// Scenario 2: Current input field is empty, and we're not at the first field
			else if (index > 0) {
				newOtp[index - 1] = ''; // Clear the current input
				setOtp(newOtp);
				inputRef.current[index - 1]?.focus(); // Move focus to the previous input
			}
		}
		// Optional: Handle left/right arrow keys for better navigation (not strictly needed for backspace, but good UX)
		else if (e.key === 'ArrowRight' && index < otplength - 1) {
			inputRef.current[index + 1].focus();
		} else if (e.key === 'ArrowLeft' && index > 0) {
			inputRef.current[index - 1].focus();
		}
	};

	const handlePaste = async (e: React.ClipboardEvent) => {
		e.preventDefault(); // Prevent the default paste behavior

		const pastedData = await navigator.clipboard.readText();
		const numericPastedData = pastedData.replace(/\D/g, ''); // Remove any non-digit characters

		if (numericPastedData.length <= otplength) {
			const newOtp = [...otp];
			numericPastedData.split('').forEach((digit, index) => {
				if (index < otplength) {
					newOtp[index] = digit;
				}
			});
			setOtp(newOtp);

			// Automatically focus on the last filled input field after pasting
			// const lastFilledIndex =
			// 	Math.min(numericPastedData.length, otplength) - 1;
			// if (lastFilledIndex >= 0 && lastFilledIndex < otplength - 1) {
			// 	inputRef.current[lastFilledIndex + 1]?.focus();
			// } else if (otplength > 0 && numericPastedData.length === otplength) {
			// 	inputRef.current[otplength - 1]?.focus();
			// }
		}
	};

	return (
		<div>
			<h1>Enter the {otplength}-digit code we sent </h1>

			{otp.map((input, index) => (
				<input
					className="p-2 py-7 mt-7 border border-gray-300 rounded-md m-2 text-center w-16 appearance-none text-3xl font-bold focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
					key={index}
					type="text"
					placeholder="0"
					maxLength={1}
					ref={(el) => {
						inputRef.current[index] = el!;
					}}
					value={otp[index]}
					onChange={(e) => handleChange(e, index)}
					onKeyDown={(e) => handleKeyDown(e, index)}
					onPaste={handlePaste}
				/>
			))}

			<br />
		</div>
	);
};

export default OtpInput;
