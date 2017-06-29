import API from '../api';
import { FETCH_BILL, FETCH_BILL_STATE } from '../constants'

export const fetchBills = () => {
	return (dispatch) => {
		dispatch({
			type: FETCH_BILL_STATE,
			payload: true,
		});

		API.bill.fetch({
			query: {
				order: { id: 'desc' },
				page_size: 1000,
				extend: 'company',
				merge: true,
			}
		})
		.then(response => {
			dispatch({
				type: FETCH_BILL,
				payload: response.data.bill
			})
		})
		.catch(error => {
			console.warn('[API ERROR]', error)
		})
	}
};