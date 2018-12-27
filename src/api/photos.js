import { VK_API_VERSION } from '../constants';

export function fetchAlbums(options = {}) {
  options = {
    ...options,
    need_covers: 1,
    need_system: 1,
    photo_sizes: 1,
    album_ids: -7,
    v: VK_API_VERSION,
  };

  return new Promise((resolve, reject) => {
    VK.api('photos.getAlbums', options, (response) => {
      if (response.response) resolve(response.response);
      else reject(response.error);
    });
  });
}

export function fetchPhotos(options = {}) {
  if (!options.owner_id && !options.album_id)
    return Promise.reject('No owner/album id specified.');

  options = {
    ...options,
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