import API from '../api'
import {
	FETCH_FRIENDS,
	FETCH_FRIENDS_STATE,
} from '../constants';

export const fetchFriends = (options = {}) => {
	return (dispatch, getState) => {
		const state = getState();
		options.user_id = options.user_id || state.user.user.id;

		// Should make API request?
		if (state.friends.friends[options.user_id]) {
			return Promise.resolve(state.friends.friends[options.user_id].items);
		}

		dispatch({
			type: FETCH_FRIENDS_STATE,
			payload: true,
		});

		// API request, returns Promise with response
		return API.friends.fetchFriends(options)
		.then(response => {
			dispatch({
				type: FETCH_FRIENDS,
				payload: {
					user_id: options.user_id,
					friends: response,
				}
			});
			return response.items;
		})
		.catch(error => {
			console.warn('[API ERROR FRIENDS]', error)
		})
		.then(response => {
			dispatch({
				type: FETCH_FRIENDS_STATE,
				payload: false,
			});
			return response;
		})
	}
};