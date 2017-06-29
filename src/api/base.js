import qs from 'qs'

const fetchParams = {
	mode: 'CORS',
	credentials: 'include',
	headers: {
		'Accept': 'application/json',
		'Content-Type': 'application/json',
	},
};

export const get = (url, queryParams = {}) => {
	const query = qs.stringify(queryParams);
	if (query) url += `?${query}`;

	return fetch(url, {
		...fetchParams,
	}).then(response => response.json())
};

export const post = (url, body) => {
	return fetch(url, {
		...fetchParams,
		method: 'POST',
		body: JSON.stringify(body)
	}).then(response => response.json())
};

export const put = (url, body) => {
	return fetch(url, {
		...fetchParams,
		method: 'PUT',
		body: JSON.stringify(body)
	}).then(response => response.json())
};

export const del = (url) => {
	return fetch(url, {
		...fetchParams,
		method: 'DELETE',
	})
};