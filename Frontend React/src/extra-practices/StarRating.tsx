import { useState } from 'react';

type StarRatingProps = {
	totalStars?: number;
	color: string;
};

const StarRating = ({ totalStars = 5, color }: StarRatingProps) => {
	const [rating, setRating] = useState(0);
	const [hoverRating, setHoverRating] = useState(0);

	const stars = new Array(totalStars).fill(0);

	const starStyle = {
		fontSize: '4rem', // Adjust as needed
		cursor: 'pointer',
		transition: 'color 0.2s ease-in-out',
	};

	const getStarColor = (starValue: number) => {
		return starValue <= (hoverRating > 0 ? hoverRating : rating)
			? color
			: 'gray';
	};

	return (
		<div>
			{stars.map((_, index) => {
				const starValue = index + 1;

				return (
					<span
						key={index}
						style={{
							...starStyle,
							color: getStarColor(starValue),
						}}
						onMouseEnter={() => setHoverRating(starValue)}
						onMouseLeave={() => setHoverRating(0)}
						onClick={() => setRating(starValue)}>
						★
					</span>
				);
			})}
		</div>
	);
};

export default StarRating;
