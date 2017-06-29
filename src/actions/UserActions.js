import API from '../api';
import { FETCH_USER, FETCH_USER_STATE } from '../constants'

export const fetchUser = () => {
	return (dispatch) => {
		dispatch({
			type: FETCH_USER_STATE,
			payload: true
		});

		return API.users.fetchSelf()
		.then((user) => {
			dispatch({
				type: FETCH_USER,
				payload: user,
			});
			return user;
		})
	}
};