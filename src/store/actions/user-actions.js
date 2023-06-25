import axios from 'axios';
import { userActions } from '../user-slice';

export const getCurrentUserFromSession = (sessionID) => {
	return async (dispatch) => {
		const response = await axios.get(
			process.env.REACT_APP_PLATFORM_PATH + '/user',
			{
				headers: {
					'Content-Type': 'application/json',
					Authorization: sessionID,
				},
			}
		);
		const user = response.data;
		dispatch(userActions.setUser(user));
	};
};

export const validateOauthToken = (token) => {
	return async (dispatch) => {
		const getSession = async () => {
			const fetchSession = async () => {
				try {
					console.log('fetching session');
					const res = await axios.post(
						process.env.REACT_APP_PLATFORM_PATH + '/oauth2/token',
						{
							provider: 'google',
							accessToken: token,
						}
					);

					if (res.status === 200) {
						console.log(res.data);
						dispatch(userActions.setUser(res.data.user));
						dispatch(userActions.setSession(res.data.session));
						localStorage.setItem(
							'session',
							JSON.stringify(res.data.session)
						);
					} else {
						throw new Error('Failed to fetch session');
					}
				} catch (e) {
					console.log(e);
				}
			};

			await fetchSession();

			localStorage.setItem('jh-google-oauth-token', token);
		};

		getSession();
	};
};
