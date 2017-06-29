import { FETCH_USERS, FETCH_USERS_STATE } from '../constants'

const initialState = {
	isFetching: false,
	users: []
};

export default function (state = initialState, action) {
	switch (action.type) {
		case FETCH_USERS_STATE:
			return {
				...state,
				isFetching: action.payload
			};
		case FETCH_USERS:
			return {
				...state,
				isFetching: false,
				users: action.payload
			};

		default:
			return state
	}
}