import { FETCH_COMPANIES, FETCH_COMPANY_STATE, FETCH_COMPANY } from '../constants'

const initialState = {
	isFetching: false,
	companies: []
};

export default function (state = initialState, action) {
	switch (action.type) {
		case FETCH_COMPANY_STATE:
			return {
				...state,
				isFetching: action.payload
			};
		case FETCH_COMPANIES:
			return {
				...state,
				isFetching: false,
				companies: action.payload
			};
		case FETCH_COMPANY:
			let companies = [];

			if (!state.companies.length) companies = [action.payload];
			else {
				companies = state.companies.reduce((prevValue, curValue) => {
					if (curValue.id !== action.payload.id) prevValue.push(curValue);
					else prevValue.push(action.payload);
					return prevValue
				}, []);
			}

			return {
				...state,
				isFetching: false,
				companies
			};

		default:
			return state
	}
}