import API from '../api'
import {
	FETCH_PHOTOS,
	FETCH_PHOTOS_STATE,
} from '../constants'

export const fetchPhotos = (options) => {
	return (dispatch) => {
		dispatch({
			type: FETCH_PHOTOS_STATE,
			payload: true,
		});

		API.photos.fetchPhotos(options)
		.then(response => {
			dispatch({
				type: FETCH_PHOTOS,
				payload: {
					album_id: options.album_id,
					owner_id: options.owner_id,
					photos: response,
				}
			})
		})
		.catch(error => {
			console.warn('[API ERROR]', error)
		})
	}
};