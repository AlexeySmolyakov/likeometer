import { VK_API_VERSION } from '../constants'

export function fetchFriends (options = {}) {
	options = {
		...options,
		order: 'hints',
		fields: 'photo_200_orig',
		v: VK_API_VERSION,
	};

	return new Promise((resolve, reject) => {
		VK.api('friends.get', options, (response) => {
			if (response.response) resolve(response.response);
			else reject(response.error);
		})
	})
}