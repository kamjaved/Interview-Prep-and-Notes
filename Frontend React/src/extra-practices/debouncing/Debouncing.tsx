import { useState, useEffect } from 'react';

const DebouncingUser = () => {
	const [users, setUsers] = useState<User[]>([]);
	const [input, setInput] = useState<string>('');

	interface User {
		id: number;
		firstName: string;
		lastName: string;
	}

	interface ApiResponse {
		users: User[];
		total: string;
		limit: string;
		skip: string;
	}

	async function fetchUsers(query: string): Promise<void> {
		if (query.length === 0) {
			setUsers([]);
			return;
		}
		try {
			const res = await fetch(
				`https://dummyjson.com/users/search?q=${query}`
			);
			// Type the data from the response using the ApiResponse interface
			const data: ApiResponse = await res.json();
			setUsers(data.users);
		} catch (error) {
			console.error('Error fetching users:', error);
			// Optionally set an error state to display a message to the user
		}
	}

	const handlenChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		e.preventDefault();
		setInput(e.target.value);
	};

	useEffect(() => {
		const timeout = setTimeout(() => {
			fetchUsers(input);
		}, 500);

		return () => {
			clearTimeout(timeout);
		};
	}, [input]);

	return (
		<div>
			<h2>Enter user name inside input.</h2>

			<input
				type="text"
				placeholder="Joh Doe"
				className="w-3xl p-4 m-2 border border-amber-500 rounded-md text-2xl"
				onChange={handlenChange}
				value={input}
			/>

			{users.length > 0 && (
				<div>
					<ul className="w-3xl mt-4 border border-amber-600 p-4  rounded-lg overflow-hidden scroll-auto">
						{users.map((user, index) => (
							<li
								className=" px-4 py-2 hover:bg-amber-400 cursor-pointer font-medium"
								key={index}>
								{user?.firstName} {user?.lastName}
							</li>
						))}
					</ul>
				</div>
			)}
		</div>
	);
};

export default DebouncingUser;
