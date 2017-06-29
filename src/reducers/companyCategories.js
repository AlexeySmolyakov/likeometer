import {
	FETCH_COMPANY_CATEGORY,
	FETCH_COMPANY_CATEGORIES,
	FETCH_COMPANY_CATEGORY_STATE
} from '../constants'

const initialState = {
	isFetching: false,
	companyCategories: []
};

export default function (state = initialState, action) {
	switch (action.type) {
		case FETCH_COMPANY_CATEGORY_STATE:
			return {
				...state,
				isFetching: action.payload
			};
		case FETCH_COMPANY_CATEGORIES:
			return {
				...state,
				isFetching: false,
				companyCategories: action.payload
			};
		case FETCH_COMPANY_CATEGORY:
			let companyCategories = [];

			if (!state.companyCategories.length) companyCategories = [action.payload];
			else {
				const inArray = state.companyCategories.map(i => i.id).includes(action.payload.id);

				if (inArray) {
					companyCategories = state.companyCategories.reduce((prevValue, curValue) => {
						if (curValue.id !== action.payload.id) prevValue.push(curValue);
						else prevValue.push(action.payload);
						return prevValue
					}, []);
				} else {
					companyCategories = state.companyCategories.slice(0);
					companyCategories.push(action.payload);
				}
			}

			return {
				...state,
				isFetching: false,
				companyCategories
			};

		default:
			return state
	}
}