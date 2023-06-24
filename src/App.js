import React, { useEffect } from 'react';
import { Container } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { Outlet } from 'react-router-dom';
import {
	getCurrentUserFromSession,
	validateOauthToken,
} from './store/actions/user-actions';
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import './App.css';

function App() {
	const user = useSelector((state) => state.user.user);
	const dispatch = useDispatch();
	const sessionData = localStorage.getItem('session');
	const googleOauthToken = localStorage.getItem('jh-google-oauth-token');

	useEffect(() => {
		// If we have a user then we don't need to validate the token
		if (user) {
			return;
		}

		// If we have a session but no user, get the user info
		if (sessionData) {
			const session = JSON.parse(sessionData);
			dispatch(getCurrentUserFromSession(session.id));
		}

		// If we don't have a session but we have an oauth token, fetch the session
		if (!sessionData && googleOauthToken) {
			dispatch(validateOauthToken(googleOauthToken));
		}
	}, [user, sessionData, googleOauthToken, dispatch]);

	return (
		<LocalizationProvider dateAdapter={AdapterMoment}>
			<Container maxWidth="sm">
				<meta
					name="viewport"
					content="initial-scale=1, width=device-width"
				/>
				<Outlet />
				{/*<Link to="/users/signup"><Button variant="contained">Hello World</Button></Link>*/}
			</Container>
		</LocalizationProvider>
	);
}

export default App;
