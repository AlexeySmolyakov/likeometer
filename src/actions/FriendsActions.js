import API from '../api'
import {
	FETCH_FRIENDS,
	FETCH_FRIENDS_STATE,
} from '../constants';

export const fetchFriends = (options = {}) => {
	return (dispatch, getState) => {
		const state = getState();

		options.user_id = options.user_id || state.user.user.uid;

		dispatch({
			type: FETCH_FRIENDS_STATE,
			payload: true,
		});

		if (state.friends.friends[options.user_id]) {
			dispatch({
				type: FETCH_FRIENDS,
				payload: {
					user_id: options.user_id,
					friends: state.friends.friends[options.user_id],
				}
			});
			return;
		}

		API.friends.fetchFriends(options)
		.then(response => {
			dispatch({
				type: FETCH_FRIENDS,
				payload: {
					user_id: options.user_id,
					friends: response,
				}
			})
		})
		.catch(error => {
			console.warn('[API ERROR]', error)
		})
	}
};