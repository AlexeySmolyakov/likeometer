import API from '../api';
import { FETCH_COMPANY_CATEGORIES, FETCH_COMPANY_CATEGORY_STATE, FETCH_COMPANY_CATEGORY } from '../constants'

export const fetchCategories = () => {
	return (dispatch) => {
		dispatch({
			type: FETCH_COMPANY_CATEGORY_STATE,
			payload: true,
		});

		API.companyCategory.fetch({
			query: {
				order: { id: 'desc' },
				page_size: 1000,
			}
		})
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

export const save = ({ id, data }) => {
	return dispatch => {
		return API.companyCategory.save({ id, data })
		.then(({ data }) => {
			dispatch({
				type: FETCH_COMPANY_CATEGORY,
				payload: data
			});

			return data;
		})
		.catch(error => {
			console.warn('[API ERROR]', error)
		})
	}
};


export const destroy = ({ id }) => {
	return dispatch => {
		return API.companyCategory.destroy({ id })
		.catch(error => {
			console.warn('[API ERROR]', error)
		})
	}
};