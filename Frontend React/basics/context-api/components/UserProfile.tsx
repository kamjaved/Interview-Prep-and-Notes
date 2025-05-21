import { useUser } from '../UserContext';

const UserProfile = () => {
	const { user, loading, error } = useUser();

	console.log('PROFILE RENDERED');

	if (loading) {
		return <p>Loading user data...</p>;
	}

	if (error) {
		return <p>Error: {error}</p>;
	}

	if (!user) {
		return <p>No user data available.</p>;
	}

	return (
		<div>
			<h2 className="mt-4 font-bold  bg-blue-600">
				User Profile: using context api
			</h2>
			<div className="mt-4 bg-emerald-400 p-5 flex  flex-col rounded-lg">
				<p>
					<strong>Name:</strong> {user.name}
				</p>
				<p>
					<strong>Email:</strong> {user.email}
				</p>
			</div>
			{/* ... other user details */}
		</div>
	);
};

export default UserProfile;
