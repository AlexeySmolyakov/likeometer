import {
	SET_USER,
	FETCH_USER
} from '../constants'

const initialState = {
	isFetching: false,
	user: {
		id: void(0)
	}
};

export default function (state = initialState, action) {
	switch (action.type) {
		case FETCH_USER:
			return {
				...state,
				isFetching: false,
				user: action.payload
			};
		case SET_USER:
			return {
				...state,
				isFetching: false,
				user: action.payload
			};

		default:
			return state
	}
}