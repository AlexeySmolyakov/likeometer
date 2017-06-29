import API from '../api';
import { FETCH_COMPANIES, FETCH_COMPANY_STATE, FETCH_COMPANY } from '../constants'

import { fetchCompanyCategories }from './CompanyCategoriesActions'

export const fetchCompanies = () => {
	return dispatch => {
		dispatch({
			type: FETCH_COMPANY_STATE,
			payload: true,
		});

		return API.company.fetch({
			query: {
				order: { id: 'desc' },
				page_size: 1000,
				extend: 'company_category',
				merge: true,
			}
		})
		.then(response => {
			dispatch({
				type: FETCH_COMPANIES,
				payload: response.data.company
			})
		})
		.catch(error => {
			console.warn('[API ERROR]', error)
		})
	}
};

export const fetchCompany = (id) => {
	return dispatch => {
		dispatch({
			type: FETCH_COMPANY_STATE,
			payload: true
		});

		API.company.fetch({ id })
		.then(({ data }) => {
			dispatch({
				type: FETCH_COMPANY,
				payload: data
			});
		})
		.catch(error => {
			console.warn('[API ERROR]', error)
		})
	}
};

export const fetchCompanyWithCategories = (id) => {
	return dispatch => {
		dispatch({
			type: FETCH_COMPANY_STATE,
			payload: true
		});

		return dispatch(fetchCompanyCategories())
		.then(() => API.company.fetch({ id }))
		.then(({ data }) => {
			dispatch({
				type: FETCH_COMPANY,
				payload: data
			});
		})
		.catch(error => {
			console.warn('[API ERROR]', error)
		})
	}
};

export const save = ({ id, data }) => {
	return dispatch => {
		return API.company.save({ id, data })
		.then(({ data }) => {
			dispatch({
				type: FETCH_COMPANY,
				payload: data
			});
		})
		.catch(error => {
			console.warn('[API ERROR]', error)
		})
	}
};