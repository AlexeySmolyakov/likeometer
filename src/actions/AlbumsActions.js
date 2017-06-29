import API from '../api'
import {
	FETCH_ALBUMS,
	FETCH_ALBUMS_STATE,
} from '../constants';

export const fetchAlbums = (options = {}) => {
	return (dispatch, getState) => {
		options.owner_id = options.owner_id || getState().user.user.uid;

		dispatch({
			type: FETCH_ALBUMS_STATE,
			payload: true,
		});

		API.photos.fetchAlbums(options)
		.then(response => {
			dispatch({
				type: FETCH_ALBUMS,
				payload: {
					owner_id: options.owner_id,
					albums: response,
				}
			})
		})
		.catch(error => {
			console.warn('[API ERROR]', error)
		})
	}
};