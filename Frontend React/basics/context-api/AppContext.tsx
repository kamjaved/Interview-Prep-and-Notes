// ASSUME THIS AppContextAPI COMPONENT LIKE ROOT FILE LIKE INDEX.TS OR APP.TS or MAIN.ts

import AnyComponent from './components/AnyComponent';
import ComponentOne from './components/ComponentOne';
import UserProfile from './components/UserProfile';
import { ThemeProvider } from './ThemeContext';
import { UserProvider } from './UserContext';

const AppContextAPI = () => {
	console.log('MAIN  RENDERED');

	return (
		<ThemeProvider>
			<UserProvider>
				<div>
					<h4>BASIC OF CONTEXT API</h4>
					<ComponentOne />
					<UserProfile />
					<AnyComponent />
				</div>
			</UserProvider>
		</ThemeProvider>
	);
};

export default AppContextAPI;
