/* eslint-disable camelcase, no-undef */

import VK from 'VK';
import { VK_API_VERSION } from '../constants';

/**
 *
 * @param {Object} params
 * @param {Number} params.owner_id
 * @param {Number} [params.album_ids]
 * @param {Number} [params.offset=0]
 * @param {Number} [params.count=50]
 * @returns {Promise<any>}
 */
export function fetchAlbums(params = {}) {
  const options = {
    ...params,
    need_covers: 1,
    need_system: 1,
    photo_sizes: 1,
    v: VK_API_VERSION,
  };

  return new Promise((resolve, reject) => {
    VK.api('photos.getAlbums', options, response => {
      if (response.response) resolve(response.response);
      else reject(response.error);
    });
  });
}

/**
 * Fetch photos in album.
 * @param {Object} params
 * @param {number} params.owner_id
 * @param {number} params.album_id
 * @param {number} [params.count=100]
 * @param {number} [params.offset=0]
 * @returns {Promise<any>}
 */
export function fetchPhotos(params) {
  const { owner_id, album_id, count = 100, offset = 0 } = params;

  if (!owner_id && !album_id) {
    return Promise.reject(new Error('No owner/album id specified.'));
  }

  const options = {
    owner_id,
    album_id,
    count,
    offset,
    rev: 1,
    extended: 1,
    photo_sizes: 1,
    v: VK_API_VERSION,
  };

  return new Promise((resolve, reject) => {
    VK.api('photos.get', options, response => {
      if (response.response) resolve(response.response);
      else reject(new Error(response.error));
    });
  });
}
