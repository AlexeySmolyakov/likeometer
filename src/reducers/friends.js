import {
	FETCH_FRIENDS,
	FETCH_FRIENDS_STATE
} from '../constants'

const initialState = {
	isFetching: false,
	friends: {}
};

export default function (state = initialState, action) {
	switch (action.type) {
		case FETCH_FRIENDS_STATE:
			return {
				...state,
				isFetching: action.payload
			};

		case FETCH_FRIENDS:
			const friends = {
				...state.friends,
				[action.payload.user_id]: action.payload.friends
			};

			return {
				...state,
				isFetching: false,
				friends
			};

		default:
			return state
	}
}