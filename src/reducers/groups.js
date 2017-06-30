import {
	FETCH_GROUPS,
	FETCH_GROUPS_STATE
} from '../constants'

const initialState = {
	isFetching: false,
	groups: {}
};

export default function (state = initialState, action) {
	switch (action.type) {
		case FETCH_GROUPS_STATE:
			return {
				...state,
				isFetching: action.payload
			};

		case FETCH_GROUPS:
			const groups = {
				...state.groups,
				[action.payload.user_id]: action.payload.groups
			};

			return {
				...state,
				groups
			};

		default:
			return state
	}
}