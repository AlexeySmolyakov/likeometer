import {
	FETCH_ALBUMS,
	FETCH_ALBUMS_STATE
} from '../constants'

const initialState = {
	isFetching: false,
	albums: {}
};

export default function (state = initialState, action) {
	switch (action.type) {
		case FETCH_ALBUMS_STATE:
			return {
				...state,
				isFetching: action.payload
			};

		case FETCH_ALBUMS:
			const albums = {
				...state.albums,
				[action.payload.owner_id]: action.payload.albums
			};

			return {
				...state,
				albums
			};

		default:
			return state
	}
}