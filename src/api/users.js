import VK from 'VK';
import { VK_API_VERSION } from '../constants';

/**
 *
 * @param {Object} params
 * @param {number[]} params.user_ids
 * @returns {Promise<any>}
 */
export function fetchUsers(params = {}) {
  const options = {
    ...params,
    fields: 'photo_200_orig',
    v: VK_API_VERSION,
  };

  return new Promise((resolve, reject) => {
    VK.api('users.get', options, response => {
      if (response.error) {
        reject(new Error(response.error));
      } else {
        resolve(response.response);
      }
    });
  });
}
