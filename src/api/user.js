import * as API from './base';
import { API_URL_BACK } from '../constants';

const BASE_URL = `${API_URL_BACK}/user`;

export function fetch (options = {}) {
	const { id, query } = options;
	let url = BASE_URL;
	if (id) url += `/${id}`;

	return API.get(url, query)
}

export function save (user) {
	let url = BASE_URL;

	if (user.id) {
		url = `${BASE_URL}/${user.id}`;
		return API.put(url, user)
	} else {
		return API.post(url, user)
	}
}