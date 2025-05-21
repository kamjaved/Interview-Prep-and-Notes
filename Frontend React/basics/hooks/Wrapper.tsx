import Parent from './useCallBack/Parent';
import Expensive from './useMemo/Expensive';

const Wrapper = () => {
	return (
		<>
			<Parent />
			<br />
			<br />
			<br />

			<Expensive />
		</>
	);
};

export default Wrapper;
