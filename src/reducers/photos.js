import {
	FETCH_PHOTOS,
	FETCH_PHOTOS_STATE
} from '../constants'

const initialState = {
	isFetching: false,
	photos: {}
};

export default function (state = initialState, action) {
	switch (action.type) {
		case FETCH_PHOTOS_STATE:
			return {
				...state,
				isFetching: action.payload
			};

		case FETCH_PHOTOS:
			const key = `${action.payload.owner_id}_${action.payload.album_id}`;

			const photos = {
				...state.photos,
				[key]: action.payload.photos
			};

			return {
				...state,
				isFetching: false,
				photos
			};

		default:
			return state
	}
}