import API from '../api'
import {
	FETCH_GROUPS,
	FETCH_GROUPS_STATE,
} from '../constants';

export const fetchGroups = (options = {}) => {
	return (dispatch, getState) => {
		const state = getState();
		options.user_id = options.user_id || state.user.user.id;

		// Should make API request?
		if (state.groups.groups[options.user_id]) {
			return Promise.resolve(state.groups.groups[options.user_id].items);
		}

		dispatch({
			type: FETCH_GROUPS_STATE,
			payload: true,
		});

		// API request, returns Promise with response
		return API.groups.fetchGroups(options)
		.then(response => {
			dispatch({
				type: FETCH_GROUPS,
				payload: {
					user_id: options.user_id,
					groups: response,
				}
			});
			return response.items;
		})
		.catch(error => {
			console.warn('[API ERROR GROUPS]', error)
		})
		.then(response => {
			dispatch({
				type: FETCH_GROUPS_STATE,
				payload: false,
			});
			return response;
		})
	}
};