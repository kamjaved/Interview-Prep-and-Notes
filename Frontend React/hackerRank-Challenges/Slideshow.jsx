import React, { useState } from 'react';

function Slides({ slides }) {
	const [currentSlideIndex, setCurrentSlideIndex] = useState(0);

	const handleOnClickRestart = () => {
		setCurrentSlideIndex(0);
	};
	const handleOnClickPrevious = () => {
		setCurrentSlideIndex(currentSlideIndex - 1); // Correction 1
	};
	const handleOnClickNext = () => {
		setCurrentSlideIndex(currentSlideIndex + 1); // Correction 2
	};

	return (
		<div>
			<div id="navigation" className="text-center">
				<button
					data-testid="button-restart"
					className="small outlined"
					disabled={currentSlideIndex === 0} // Same logic as yours
					onClick={handleOnClickRestart}>
					Restart
				</button>
				<button
					data-testid="button-prev"
					className="small"
					disabled={currentSlideIndex === 0} // Same logic as yours
					onClick={handleOnClickPrevious}>
					Prev
				</button>
				<button
					data-testid="button-next"
					className="small"
					disabled={currentSlideIndex === slides.length - 1} // Same logic as yours
					onClick={handleOnClickNext}>
					Next
				</button>
			</div>
			<div id="slide" className="card text-center">
				<h1 data-testid="title">{slides[currentSlideIndex].title}</h1>
				<p data-testid="text">{slides[currentSlideIndex].text}</p>
			</div>
		</div>
	);
}

export default Slides;
