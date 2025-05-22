import { useState } from 'react';

type Props = {
	title: string;
	icon: string;
};
const CodeReviewFeedback = ({ title, icon }: Props) => {
	const [upVoteCount, setUpVoteCount] = useState(100);
	const [downVoteCount, setDownVoteCount] = useState(100);

	console.log('REFRESH', upVoteCount, downVoteCount);

	return (
		<div className="bg-white-100 m-3 max-w-fit rounded-xl border border-gray-100 p-4 py-6 text-center shadow-xl transition-transform duration-200 ease-in hover:scale-102 cursor-pointer">
			<h4 className="text-2xl font-mono uppercase font-stretch-95%">
				{title} {icon}
			</h4>
			<br />

			<div className="m-2 flex flex-row justify-evenly">
				<button
					className="m-2 cursor-pointer rounded-2xl w-32 bg-green-400 p-4 font-bold duration-300 ease-in-out hover:bg-green-500 hover:scale-102"
					onClick={() => setUpVoteCount((prev) => (prev = prev + 1))}>
					👍 Upvote
				</button>
				<button
					className="m-2 cursor-pointer rounded-2xl w-32 bg-red-400 p-4 font-bold duration-300 ease-in-out hover:bg-red-500 hover:scale-102"
					onClick={() => setDownVoteCount((prev) => (prev = prev + 1))}>
					👎 Downvote
				</button>
			</div>

			<div className="p-4 bg-amber-50 flex flex-row justify-between rounded-xl">
				<p className="font-light  text-lg">
					Upvotes: <span className="font-bold">{upVoteCount}</span>
				</p>
				<p className="font-light text-lg ">
					Downvotes: <span className="font-bold">{downVoteCount}</span>
				</p>
			</div>
		</div>
	);
};

export default CodeReviewFeedback;
