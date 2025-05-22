// NOTE: THE BELOW SOLUTION WAS WORKING ALTHOUGH THERE WAS SOME PROBLEM IN THE TEST CASE ATTACHED IN HACKER RANK WHICH DOESN"T LET ME SUBMIT THE SOLUTION

import 'h8k-components';
import { useState, useEffect } from 'react';
import Articles from './Articles';

import './App.css';

function App({ articles }) {
	useEffect(() => {
		handleMostUpvoted();
	}, []);

	let sortedArticles = articles.sort((a, b) => b.upvotes - a.upvotes);
	const [articleState, setArticleState] = useState([...sortedArticles]);
	//  const [isClicked, setIsClicked]= useState(false)

	const handleMostUpvoted = () => {
		//  setIsClicked(!isClicked)
		// Logic for most upvoted articles
		let sortedArticlesByVote = [...articleState].sort(
			(a, b) => a.upvotes - b.upvotes
		);
		setArticleState(sortedArticlesByVote);
	};

	const handleMostRecent = () => {
		// Logic for most recent articles
		let sortedArticlesByDate = [...articleState].sort(
			(a, b) => new Date(b.date) - new Date(a.date)
		);
		setArticleState(sortedArticlesByDate);
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
