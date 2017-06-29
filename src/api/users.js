export function fetchSelf () {
	return new Promise((resolve, reject) => {
		VK.api('users.get', { fields: 'photo_200_orig' }, (response) => {
			if (response.error) reject(response.error);
			else resolve(response.response[0])
		})
	})
}

export function fetch (options = {}) {
	return new Promise((resolve, reject) => {
		VK.api('users.get', options, (response) => {
			if (response.error) reject(response.error);
			else resolve(response.response)
		})
	})
}