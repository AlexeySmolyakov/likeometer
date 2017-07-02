import { VK_API_VERSION } from '../constants'

export function fetch (options = {}) {
	options = {
		...options,
		fields: 'photo_200_orig',
		v: VK_API_VERSION,
	};

	return new Promise((resolve, reject) => {
		VK.api('users.get', options, (response) => {
			if (response.error) reject(response.error);
			else resolve(response.response)
		})
	})
}