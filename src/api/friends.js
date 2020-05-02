import VK from 'VK';
import { VK_API_VERSION } from '../constants';

/**
 * Fetch friends.
 * @param {Object} options
 * @return {Promise<Object>}
 */
export function fetchFriends(options = {}) {
  const mergedOptions = {
    ...options,
    order: 'hints',
    fields: 'photo_100',
    v: VK_API_VERSION,
  };

  return new Promise((resolve, reject) => {
    VK.api('friends.get', mergedOptions, response => {
      if (response.response) resolve(response.response);
      else reject(response.error);
    });
  });
}
