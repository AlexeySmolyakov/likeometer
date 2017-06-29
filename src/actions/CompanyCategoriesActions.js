import API from '../api';
import {
	FETCH_COMPANY_CATEGORY,
	FETCH_COMPANY_CATEGORIES,
	FETCH_COMPANY_CATEGORY_STATE
} from '../constants'

export const fetchCompanyCategories = () => {
	return dispatch => {
		dispatch({
			type: FETCH_COMPANY_CATEGORY_STATE,
			payload: true,
		});

		return API.companyCategory.fetch({ query: { order: { id: 'desc' } } })
		.then(response => {
			dispatch({
				type: FETCH_COMPANY_CATEGORIES,
				payload: response.data['company-category']
			})
		})
		.catch(error => {
			console.warn('[API ERROR]', error)
		})
	}
};

export const fetchCompanyCategory = (id) => {
	return dispatch => {
		dispatch({
			type: FETCH_COMPANY_CATEGORY_STATE,
			payload: true
		});

		return API.companyCategory.fetch({ id })
		.then(({ data }) => {
			dispatch({
				type: FETCH_COMPANY_CATEGORY,
				payload: data
			});
		})
		.catch(error => {
			console.warn('[API ERROR]', error)
		})
	}
};