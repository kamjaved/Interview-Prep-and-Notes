import './App.css';
import AppContextAPI from './basics/context-api/AppContext';
import InputValidationAge from './extra-practices/InputValidationAge';
// import DebouncingUser from './extra-practices/debouncing/Debouncing';
// import OtpInput from './extra-practices/otp-autofill/OTP';
// import StarRating from './extra-practices/StarRating';
// import WrapperCodeReview from './hackerRank-Challenges/CodeReviewFeedback/WrapperCodeReview';

function App() {
	return (
		<>
			{/* <WrapperCodeReview /> */}

			{/* <h1>STAR RATING</h1> */}

			{/* <StarRating totalStars={5} color={'#dfdd55'} />
			<StarRating totalStars={8} color={'#1a78f9'} />
			<StarRating totalStars={10} color={'red'} /> */}

			{/* <OtpInput otplength={4} /> */}

			{/* <DebouncingUser /> */}

			<AppContextAPI />
			<InputValidationAge />
		</>
	);
}

export default App;
