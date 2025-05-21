import CodeReviewFeedback from './CodeReviewFeedback';

const WrapperCodeReview = () => {
	return (
		<>
			<h2 className="font-medium text-4xl mb-12 text-blue-800 text-shadow-blue-500 text-shadow-2xs uppercase">
				{' '}
				Code Review Cards
			</h2>

			<div className="flex flex-wrap justify-center gap-3">
				{/* <h1 className="text-3xl text-red-400">Hello</h1> */}
				<CodeReviewFeedback title={'Readibility'} icon="📖" />
				<CodeReviewFeedback title={'Performance'} icon="🚀" />
				<CodeReviewFeedback title={'Security'} icon="🛡️" />
				<CodeReviewFeedback title={'Documentation'} icon="📝" />
				<CodeReviewFeedback title={'Testing'} icon="✅" />
			</div>
		</>
	);
};

export default WrapperCodeReview;
