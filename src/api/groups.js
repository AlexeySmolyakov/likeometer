import { VK_API_VERSION } from '../constants';

/**
 * Get groups.
 * @param options
 * @returns {Promise<any>}
 */
export function fetchGroups(options = {}) {
  const mergedOptions = {
    ...options,
    extended: 1,
    fields: 'counters',
    v: VK_API_VERSION,
  };

  return new Promise((resolve, reject) => {
    VK.api('groups.get', mergedOptions, response => {
      if (response.response) resolve(response.response);
      else reject(response.error);
    });
  });
}

/**
 * Get groups.
 * @param {Object} options
 * @param {Array<number>} options.group_ids
 * @returns {Promise<any>}
 */
export function fetchGroupsById(options = {}) {
  const mergedOptions = {
    ...options,
    extended: 1,
    fields: 'counters',
    v: VK_API_VERSION,
  };

  return new Promise((resolve, reject) => {
    VK.api('groups.getById', mergedOptions, response => {
      if (response.response) resolve(response.response);
      else reject(response.error);
    });
  });
}
