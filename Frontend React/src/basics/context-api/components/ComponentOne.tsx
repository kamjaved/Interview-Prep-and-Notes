const ComponentOne = () => {
	console.log('ONE RENDERED');
	return (
		<div>
			{' '}
			<h2 className=" mt-4 font-bold  bg-red-600">
				ComponentOne: not using contextAPI
			</h2>
		</div>
	);
};

export default ComponentOne;
