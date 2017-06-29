import {
	CHECKING_AUTH,
	FETCH_USER,
	FETCH_USER_STATE,
} from '../constants'

const initialState = {
	isFetching: false,
	user: { uid: void(0) },
	checkingAuth: true,
};

export default function (state = initialState, action) {
	switch (action.type) {

		case CHECKING_AUTH:
			return {
				...state,
				checkingAuth: action.payload
			};

		case FETCH_USER:
			return {
				...state,
				isFetching: false,
				user: action.payload,
			};

		case FETCH_USER_STATE:
			return {
				...state,
				isFetching: action.payload,
			};

		default:
			return state
	}
}