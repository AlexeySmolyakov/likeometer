import * as API from './base';
import { API_URL_BACK } from '../constants';

const BASE_URL = `${API_URL_BACK}/company`;

export function fetch (options = {}) {
	const { id, query } = options;
	let url = BASE_URL;
	if (id) url += `/${id}`;

	return API.get(url, query)
}

export function save (options = {}) {
	const { id, data } = options;
	let url = BASE_URL;

	if (id) {
		url = `${BASE_URL}/${id}`;
		return API.put(url, data)
	} else {
		return API.post(url, data)
	}
}