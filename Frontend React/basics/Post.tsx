import { useState } from 'react';
import type { PostProps as Post } from './type';

type PostProps = {
	post: Post;
	index: number;
};

// type Post = {
// 	id: number;
// 	title: string;
// 	body: string;
// 	userId: number;
// };

const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
	e.preventDefault();
};

const Post = ({ post, index }: PostProps) => {
	const [posts, setPost] = useState(post);

	return (
		<div key={index}>
			<h5>
				{index + 1}-{post.title}
			</h5>
			<p>{post.body.slice(0, 50)}....</p>

			<form onSubmit={(e) => handleSubmit(e)}>
				<input
					type="text"
					name="title"
					value={post.title}
					onChange={(e) => setPost({ ...post, title: e.target.value })}
				/>
				<button type="submit">Submit </button>
			</form>
		</div>
	);
};

export default Post;
