import API from '../api'
import {
	FETCH_ALBUMS,
	FETCH_ALBUMS_STATE,
} from '../constants';

export const fetchAlbums = (options = {}) => {
	return (dispatch, getState) => {
		const state = getState();
		options.owner_id = options.owner_id || state.user.user.id;

		// Should make API request?
		if (state.albums.albums[options.owner_id]) {
			return Promise.resolve(state.albums.albums[options.owner_id].items);
		}

		dispatch({
			type: FETCH_ALBUMS_STATE,
			payload: true,
		});

		// API request, returns Promise with response
		return API.photos.fetchAlbums(options)
		.then(response => {
			dispatch({
				type: FETCH_ALBUMS,
				payload: {
					owner_id: options.owner_id,
					albums: response,
				}
			});
			return response.items;
		})
		.catch(error => {
			console.warn('[API ERROR ALBUMS]', error)
		})
		.then(response => {
			dispatch({
				type: FETCH_ALBUMS_STATE,
				payload: false,
			});
			return response;
		})
	}
};