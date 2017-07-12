import API from '../api'
import { sortPhotos } from '../helpers'
import {
	FETCH_PHOTOS,
	FETCH_PHOTOS_STATE,
	FETCH_PHOTOS_BY_ID,
	FETCH_PHOTOS_BY_ID_STATE
} from '../constants'

export const fetchPhotos = (options) => {
	return (dispatch, getState) => {
		const state = getState();
		const { owner_id, album_id } = options;
		const key = `${owner_id}_${album_id}`;

		// Should make API request?
		if (state.photos.photos[key]) {
			return Promise.resolve(state.photos.photos[key].items);
		}

		dispatch({
			type: FETCH_PHOTOS_STATE,
			payload: true,
		});

		// API request, returns Promise with response
		return API.photos.fetchPhotos(options)
		.then(response => {
			dispatch({
				type: FETCH_PHOTOS,
				payload: {
					album_id: options.album_id,
					owner_id: options.owner_id,
					photos: response,
				}
			});
			return response.items;
		})
		.catch(error => {
			console.warn('[API ERROR PHOTOS]', error)
		})
		.then(response => {
			dispatch({
				type: FETCH_PHOTOS_STATE,
				payload: false,
			});
			return response;
		})
	}
};

export const fetchAllPhotos = (options = {}) => {
	return (dispatch, getState) => {
		const state = getState();
		const { owner_id, album_id } = options;
		const key = `${owner_id}_${album_id}`;

		let offset = 0;
		options.count = 1000;

		// Should make API request?
		if (state.photos.photos[key]) {
			return Promise.resolve(state.photos.photos[key].items);
		}

		dispatch({
			type: FETCH_PHOTOS_STATE,
			payload: true,
		});

		// API request, returns Promise with response
		const fetch = () => {
			options.offset = offset;
			//console.warn(options);
			return API.photos.fetchPhotos(options)
			.then((response) => {
				//console.warn(response);
				offset += 1000;

				const loadMore = response.items.length === 1000;
				const photos = getState().photos.photos[key];
				if (photos) response.items = [...photos.items, ...response.items];

				response.items = sortPhotos(response.items);
				//console.warn('items', response);

				dispatch({
					type: FETCH_PHOTOS,
					payload: {
						album_id: options.album_id,
						owner_id: options.owner_id,
						photos: response,
					}
				});

				if (loadMore) return fetch();
			})
		};

		return fetch()
		.then(response => {
			//console.warn('resolved', offset);
			dispatch({
				type: FETCH_PHOTOS_STATE,
				payload: false,
			});
			return response;
		})
	}
};

export const fetchPhotosById = (options) => {
	return (dispatch) => {
		const { photos } = options;

		dispatch({
			type: FETCH_PHOTOS_BY_ID_STATE,
			payload: true,
		});

		return API.photos.fetchPhotosById({ photos })
		.then(response => {
			//dispatch({
			//	type: FETCH_PHOTOS_BY_ID,
			//	payload: response[0] || {}
			//});
			return response;
		})
		.catch(error => {
			console.warn('[API ERROR PHOTOS BY ID]', error)
		})
		.then(response => {
			dispatch({
				type: FETCH_PHOTOS_BY_ID_STATE,
				payload: false,
			});
			return response;
		});
	}
};