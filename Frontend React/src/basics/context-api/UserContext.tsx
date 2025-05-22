import * as React from 'react';
import { createContext, useState, useEffect, useContext } from 'react';

// Define the shape of the context value
interface UserContextType {
	user: User | null;
	loading: boolean;
	error: string | null;
}

// Define the shape of the user data
interface User {
	id: number;
	name: string;
	email: string;
	// ... other user properties
}

// Create the context with a default value (can be null or an initial state)
const UserContext = createContext<UserContextType | undefined>(undefined);

// Custom hook to easily use the UserContext

export const useUser = () => {
	const context = useContext(UserContext);
	if (!context) {
		throw new Error('useUser must be used within a UserProvider');
	}
	return context;
};

// Create the Provider component
export const UserProvider: React.FC<{ children: React.ReactNode }> = ({
	children,
}) => {
	const [user, setUser] = useState<User | null>(null);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState<string | null>(null);

	useEffect(() => {
		const fetchUserData = async () => {
			try {
				const response = await fetch(
					'https://jsonplaceholder.typicode.com/users/1'
				); // Example API
				if (!response.ok) {
					throw new Error(`HTTP error! status: ${response.status}`);
				}
				const data: User = await response.json();
				setUser(data);
				setLoading(false);
			} catch (err: unknown) {
				if (err instanceof Error) {
					setError(err.message);
				} else {
					setError('An unknown error occurred');
				}
				setLoading(false);
			}
		};

		fetchUserData();
	}, []);

	return (
		<UserContext.Provider value={{ user, loading, error }}>
			{children}
		</UserContext.Provider>
	);
};
