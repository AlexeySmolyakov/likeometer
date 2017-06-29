import { FETCH_BILL, FETCH_BILL_STATE } from '../constants'

const initialState = {
	isFetching: false,
	bills: []
};

export default function (state = initialState, action) {
	switch (action.type) {
		case FETCH_BILL_STATE:
			return {
				...state,
				isFetching: action.payload
			};
		case FETCH_BILL:
			return {
				...state,
				isFetching: false,
				bills: action.payload
			};

		default:
			return state
	}
}