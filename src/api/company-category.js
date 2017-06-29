import * as API from './base';
import { API_URL_BACK } from '../constants';

const BASE_URL = `${API_URL_BACK}/company-category`;

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

export function destroy (options = {}) {
	const { id } = options;
	if (!id) return console.warn('No id for DELETE method.');
	let url = `${BASE_URL}/${id}`;

	return API.del(url);
}