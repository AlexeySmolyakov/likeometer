/* eslint-disable camelcase, no-undef */

import { VK_API_VERSION } from '../constants';

// import { fetchAllPhotos } from '../actions/PhotosActions';

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

export function fetchPhotosById(options = {}) {
  if (!options.photos) return Promise.reject('No photo id specified.');

  options = {
    ...options,
    extended: 1,
    photo_sizes: 1,
    v: VK_API_VERSION,
  };

  return new Promise((resolve, reject) => {
    VK.api('photos.getById', options, response => {
      if (response.response) resolve(response.response);
      else reject(response.error);
    });
  });
}

export const fetchAllPhotos = ({ owner_id, album_id, onProgress }) => {
  const count = 0;
  const items = [];
  let promises = [];
  let resolve = null;

  const promise = new Promise(r => resolve = r);

  const delayedPromise = ({ owner_id, album_id, offset }) => () => fetchPhotos({
    owner_id,
    album_id,
    offset,
    limit: 1000,
  })
    .then(r => {
      items.push(...r.items);
      if (onProgress) onProgress(items.length);
      return r;
    });

  const get5Promises = () => {
    const another5promises = [];

    if (promises.length === 0) {
      return resolve({ count, items });
    }

    for (let i = 0; i < 5; i++) {
      if (promises[i]) another5promises.push(promises[i]());
    }

    return Promise.all(another5promises)
      .then(() => {
        promises = promises.slice(5);
        console.warn('get5Promises', promises);
        get5Promises();
      });
  };

  // first fetch
  return fetchPhotos({ album_id, owner_id })
    .then(response =>
      // items.push(...response.items);
      // if (onProgress) onProgress(items.length);
      //
      // count = Math.ceil(response.count / 1000) - 1;
      // for (let i = 0; i < count; i++)
      //  promises.push(delayedPromise({ owner_id, album_id, offset: (i + 1) * 1000 }));

      // get5Promises();

      response);

  // return promise;
};

fetchAllPhotos.cancel = () => console.warn('Cancel');
