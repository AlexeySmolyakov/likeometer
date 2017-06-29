import API from '../api';
import { FETCH_USERS, FETCH_USERS_STATE } from '../constants'

export const fetchUsers = () => {
	return (dispatch) => {
		dispatch({
			type: FETCH_USERS_STATE,
			payload: true,
		});

		API.user.fetch({
			query: {
				order: { id: 'desc' },
				page_size: 1000,
			}
		})
		.then(response => {
			dispatch({
				type: FETCH_USERS,
				payload: response.data.user
			})
		})
		.catch(error => {
			console.warn('[API ERROR]', error)
		})
	}
};