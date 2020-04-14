import { VK_API_VERSION } from '../constants';

//import { fetchAllPhotos } from '../actions/PhotosActions';

/**
 *
 * @param {Object} options
 * @param {Number} options.owner_id
 * @param {Number} [options.album_ids]
 * @param {Number} [options.offset=0]
 * @param {Number} [options.count=50]
 * @returns {Promise<any>}
 */
export function fetchAlbums(options = {}) {
  options = {
    ...options,
    need_covers: 1,
    need_system: 1,
    photo_sizes: 1,
    v: VK_API_VERSION,
  };

  return new Promise((resolve, reject) => {
    VK.api('photos.getAlbums', options, (response) => {
      if (response.response) resolve(response.response);
      else reject(response.error);
    });
  });
}

export function fetchPhotos({ owner_id, album_id, count = 100, offset = 0 }) {
  if (!owner_id && !album_id)
    return Promise.reject('No owner/album id specified.');

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
    VK.api('photos.get', options, (response) => {
      if (response.response) resolve(response.response);
      else reject(response.error);
    });
  });
}

export function fetchPhotosById(options = {}) {
  if (!options.photos)
    return Promise.reject('No photo id specified.');

  options = {
    ...options,
    extended: 1,
    photo_sizes: 1,
    v: VK_API_VERSION,
  };

  return new Promise((resolve, reject) => {
    VK.api('photos.getById', options, (response) => {
      if (response.response) resolve(response.response);
      else reject(response.error);
    });
  });
}

export const fetchAllPhotos = ({ owner_id, album_id, onProgress }) => {
  let count = 0;
  let items = [];
  let promises = [];
  let resolve = null;

  const promise = new Promise(r => resolve = r);

  const delayedPromise = ({ owner_id, album_id, offset }) => () => {
    return fetchPhotos({ owner_id, album_id, offset, limit: 1000 })
      .then(r => {
        items.push(...r.items);
        if (onProgress) onProgress(items.length);
        return r;
      });
  };

  const get5Promises = () => {
    let another5promises = [];

    if (promises.length === 0) {
      return resolve({ count, items });
    }

    for (let i = 0; i < 5; i++) if (promises[i])
      another5promises.push(promises[i]());

    return Promise.all(another5promises)
      .then(() => {
        promises = promises.slice(5);
        console.warn('get5Promises', promises);
        get5Promises();
      });
  };

  // first fetch
  return fetchPhotos({ album_id, owner_id })
    .then(response => {
      //items.push(...response.items);
      //if (onProgress) onProgress(items.length);
      //
      //count = Math.ceil(response.count / 1000) - 1;
      //for (let i = 0; i < count; i++)
      //  promises.push(delayedPromise({ owner_id, album_id, offset: (i + 1) * 1000 }));

      //get5Promises();

      return response;
    });

  //return promise;
};

fetchAllPhotos.cancel = () => console.warn('Cancel');
