// NOTE: THE BELOW SOLUTION WAS WORKING ALTHOUGH THERE WAS SOME PROBLEM IN THE TEST CASE ATTACHED IN HACKER RANK WHICH DOESN"T LET ME SUBMIT THE SOLUTION

import 'h8k-components';
import { useState, useEffect } from 'react';
import Articles from './components/Articles';

import './App.css';

function App({ articles }) {
	const sortByUpvotes = (arr) => {
		// Create a shallow copy before sorting to avoid mutating the original array
		return [...arr].sort((a, b) => b.upvotes - a.upvotes); // b - a for descending
	};

	const sortByDate = (arr) => {
		return [...arr].sort(
			(a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
		);
	};

	const [articleState, setArticleState] = useState(() =>
		sortByUpvotes(articles)
	);

	const handleMostUpvoted = () => {
		setArticleState(sortByUpvotes(articleState)); // Sort the current state
	};

	const handleMostRecent = () => {
		setArticleState(sortByDate(articleState)); // Sort the current state
	};

	return (
		<>
			<h8k-navbar header="Sorting Articles"></h8k-navbar>
			<div className="App">
				<div className="layout-row align-items-center justify-content-center my-20 navigation">
					<label className="form-hint mb-0 text-uppercase font-weight-light">
						Sort By
					</label>
					<button
						data-testid="most-upvoted-link"
						className="small"
						onClick={handleMostUpvoted}>
						Most Upvoted
					</button>
					<button
						data-testid="most-recent-link"
						className="small"
						onClick={handleMostRecent}>
						Most Recent
					</button>
				</div>
				<Articles articles={articleState} />
			</div>
		</>
	);
}

export default App;
