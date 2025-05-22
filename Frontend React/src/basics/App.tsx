import { useState } from 'react';
import './App.css';
import InterFace from './InterFace';
import Post from './Post';

import { PostProps } from './type';
import Wrapper from './hooks/Wrapper';

function App() {
	type CountProps = number | string;
	type User = { name: string; age: number; middleName?: string };
	type PartialUser = Partial<User>;
	type RequiredUser = Required<User>;

	type UnknownKeyValue = {
		[key: string]: string | boolean | number;
	};

	const UnknownObject: UnknownKeyValue = {
		name: 'Morgan',
		age: 25,
		middleName: 'Doe',
		email: 'johndoe1243@gmail.com',
		isActive: true,
	};

	type ArrayOfUnknownObject = UnknownKeyValue[];

	const usersArray: ArrayOfUnknownObject = [
		{
			name: 'Morgan',
			age: 25,
			middleName: 'Doe',
			email: 'johndoe1243@gmail.com',
			isActive: true,
		},
		{
			name: 'John',
			age: 25,
			email: 'johndoe1243@gmail.com',
		},
	];

	const [count, setCount] = useState<CountProps>(0);
	const [user, setUser] = useState<PartialUser>({});
	const [posts, setPost] = useState<PostProps[]>([]);

	const increment = () => {
		setCount('W');
	};

	const getUser: () => RequiredUser = () => {
		const user: RequiredUser = { name: 'John', age: 25, middleName: 'Doe' };
		setUser(user);
		return user;
	};

	const getUsername: () => PartialUser = () => {
		const username: PartialUser = { name: 'johndoe1243' };
		return username;
	};

	const fetchPost: () => Promise<PostProps> = async () => {
		const response = await fetch(
			'https://jsonplaceholder.typicode.com/posts'
		);
		const data = await response.json();
		setPost(data);
		console.log(data);
		return data;
	};

	async function fetchPosts(): Promise<PostProps[]> {
		const response = await fetch(
			'https://jsonplaceholder.typicode.com/posts'
		);
		const data = await response.json();
		setPost(data);
		console.log(data);
		return data;
	}

	return (
		<>
			<h2
				onClick={() => {
					increment();
					getUser();
				}}>
				REACT+TYPESCRIPT
			</h2>

			<Wrapper />

			{/* <p>{UnknownObject.name}</p>
			<h4>
				Count: {count} Name: {user.name + ' ' + user.middleName}
			</h4>

			<button className="button" onClick={fetchPosts}>
				FETCH POST
			</button>

			<InterFace />

			{posts.map((post: PostProps, index: number) => (
				<Post post={post} index={index} />
			))} */}
		</>
	);
}

export default App;
