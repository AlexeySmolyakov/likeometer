import * as API from './base';
import { API_URL_BACK } from '../constants';

const BASE_URL = `${API_URL_BACK}/bill`;

export function fetch (options = {}) {
	const { id, query } = options;
	let url = BASE_URL;
	if (id) url += `/${id}`;

	return API.get(url, query)
}