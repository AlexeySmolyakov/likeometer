import { VK_API_VERSION } from '../constants'

export function fetchGroups (options = {}) {
	options = {
		...options,
		extended: 1,
		fields: 'counters',
		v: VK_API_VERSION,
	};

	return new Promise((resolve, reject) => {
		VK.api('groups.get', options, (response) => {
			if (response.response) resolve(response.response);
			else reject(response.error);
		})
	})
}