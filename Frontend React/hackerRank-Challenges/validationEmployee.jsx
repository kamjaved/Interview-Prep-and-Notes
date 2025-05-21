// NOTE: THE BELOW SOLUTION WAS WORKING ALTHOUGH THERE WAS SOME PROBLEM IN THE TEST CASE ATTACHED IN HACKER RANK WHICH DOESN"T LET ME SUBMIT THE SOLUTION

import React, { useState, useEffect } from 'react';

function EmployeeValidationForm() {
	const [name, setName] = useState('');
	const [email, setEmail] = useState('');
	const [empid, setEmpid] = useState('');
	const [date, setDate] = useState('');
	const [submitted, setSubmitted] = useState(false);

	const nameRegex = /^[a-zA-Z\s'-]{4,}$/;
	const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
	const empidRegex = /^\d{6}$/;

	const isNameValid = nameRegex.test(name.trim());
	const isEmailValid = emailRegex.test(email.trim());
	const isEmpIdValid = empidRegex.test(empid);

	const isDateValid = () => {
		if (!date) return false;
		const dateNow = new Date('2025-05-08').getTime();
		const inputDate = new Date(date).getTime();
		return inputDate <= dateNow;
	};

	const onSubmit = () => {
		setSubmitted(true);
		if (isNameValid && isEmailValid && isEmpIdValid && isDateValid()) {
			setName('');
			setDate('');
			setEmail('');
			setEmpid('');
		}
	};

	useEffect(() => {
		setSubmitted(true);
	}, []);

	return (
		<div className="layout-column align-items-center mt-20 ">
			{/* Name input */}
			<div
				className="layout-column align-items-start mb-10 w-50"
				data-testid="input-name">
				<input
					className="w-100"
					type="text"
					name="name"
					value={name}
					placeholder="Name"
					data-testid="input-name-test"
					onChange={(e) => setName(e.target.value)}
				/>
				{submitted && !isNameValid && (
					<p className="error mt-2">
						Name must be at least 4 characters long and only contain
						letters and spaces
					</p>
				)}
			</div>

			{/* Email input */}
			<div
				className="layout-column align-items-start mb-10 w-50"
				data-testid="input-email">
				<input
					className="w-100"
					type="text"
					name="email"
					value={email}
					placeholder="Email"
					data-testid="input-email-test"
					onChange={(e) => setEmail(e.target.value)}
				/>
				{submitted && !isEmailValid && (
					<p className="error mt-2">Email must be a valid email address</p>
				)}
			</div>

			{/* Employee ID input */}
			<div
				className="layout-column align-items-start mb-10 w-50"
				data-testid="input-employee-id">
				<input
					className="w-100"
					type="text"
					name="employeeId"
					value={empid}
					placeholder="Employee ID"
					data-testid="input-employee-id-test"
					onChange={(e) => setEmpid(e.target.value)}
				/>
				{submitted && !isEmpIdValid && (
					<p className="error mt-2">
						Employee ID must be exactly 6 digits
					</p>
				)}
			</div>

			{/* Joining Date input */}
			<div
				className="layout-column align-items-start mb-10 w-50"
				data-testid="input-joining-date">
				<input
					className="w-100"
					type="date"
					name="joiningDate"
					value={date}
					placeholder="Joining Date"
					data-testid="input-joining-date-test"
					onChange={(e) => setDate(e.target.value)}
				/>
				{submitted && !isDateValid() && (
					<p className="error mt-2">
						Joining Date cannot be in the future
					</p>
				)}
			</div>

			{/* Submit Button */}
			<button
				data-testid="submit-btn"
				type="button"
				onClick={onSubmit}
				disabled={
					!isNameValid ||
					!isEmailValid ||
					!isEmpIdValid ||
					!date ||
					!isDateValid()
				}>
				Submit
			</button>
		</div>
	);
}

export default EmployeeValidationForm;
