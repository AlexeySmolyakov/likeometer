import * as API from './base';
import { API_URL_BACK } from '../constants';

const URL = `${API_URL_BACK}/auth`;

export function login ({ phone, password }) {
	const data = {
		phone,
		password,
		device_type: "web",
		type: "password",
		device_uuid: "123321",
		application: "application",
		application_version: "1.01",
		device_token: "token",
		system_version: "1.0"
	};

	return API.post(URL, data)
	.then(response => {
		if (response.status.toString()[0] === '2') {	// 2xx
			return response.data;
		}
		else {
			throw new Error()
		}
	})
}

export function logout () {
	return API.del(URL)
}

export function checkAuth () {
	return API.get(URL)
}