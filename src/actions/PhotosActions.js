import API from '../api'
import { sortPhotos } from '../helpers'
import {
	FETCH_PHOTOS,
	FETCH_PHOTOS_STATE,
	FETCH_PHOTOS_BY_ID_STATE
} from '../constants'

import Task from "../api/Task";
import TaskPool from "../api/TaskPool";

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
		const { owner_id, album_id } = options;
		const key = `${owner_id}_${album_id}`;

		const initialTask = new Task(options);
		const taskPool = new TaskPool();

		// Should make API request?
		if (getState().photos.photos[key]) {
			taskPool.resolve();
			return taskPool;
		}

		dispatch({
			type: FETCH_PHOTOS_STATE,
			payload: true,
		});

		// in order to get total photo count
		initialTask.start();
		initialTask.promise.then(response => {
			dispatch({
				type: FETCH_PHOTOS,
				payload: {
					album_id: options.album_id,
					owner_id: options.owner_id,
					photos: response,
				}
			});

			if (response.items.length < 1000) {
				dispatch({
					type: FETCH_PHOTOS_STATE,
					payload: false,
				});
				taskPool.resolve();
				return;
			}

			taskPool.set(options, response.count - response.items.length);

			taskPool.start();
			taskPool.onProgress = response => {
				const photos = getState().photos.photos[key];
				if (photos) response.items = [...photos.items, ...response.items];
				response.items = sortPhotos(response.items);

				dispatch({
					type: FETCH_PHOTOS,
					payload: {
						album_id: options.album_id,
						owner_id: options.owner_id,
						photos: response,
					}
				})
			};

			taskPool.promise.then(response => {
				//console.warn('TASK POOL END', response.length);
				dispatch({
					type: FETCH_PHOTOS_STATE,
					payload: false,
				});
			});
		});

		return taskPool;
	}
};

export const fetchAllPhotos1 = (options = {}) => {
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

				if (start.isCancelled)
					console.warn('Cancelling promise...');

				if (loadMore && !start.isCancelled) return fetch();
			})
		};

		let start = fetch();
		start.isCancelled = false;

		start.then(response => {
			dispatch({
				type: FETCH_PHOTOS_STATE,
				payload: false,
			});
			return response;
		});

		return start;
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