import {
	FETCH_ALBUMS,
	FETCH_ALBUMS_STATE,
} from '../constants'

export const fetchAlbums = () => {
	return (dispatch) => {
		dispatch({
			type: FETCH_ALBUMS_STATE,
			payload: true,
		});

		API.photos.fetch({
			query: {
				order: { id: 'desc' },
				page_size: 1000,
				extend: 'company',
				merge: true,
			}
		})
		.then(response => {
			dispatch({
				type: FETCH_BILL,
				payload: response.data.bill
			})
		})
		.catch(error => {
			console.warn('[API ERROR]', error)
		})
	}
};