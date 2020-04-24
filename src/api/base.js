import { stringify } from 'qs';

const fetchParams = {
  mode: 'CORS',
  credentials: 'include',
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  },
};

export const get = (url, queryParams = {}) => {
  const query = stringify(queryParams, { addQueryPrefix: true });

  return fetch(`${url}${query}`, {
    ...fetchParams,
  }).then(response => response.json());
};

export const post = (url, body) => fetch(url, {
  ...fetchParams,
  method: 'POST',
  body: JSON.stringify(body),
}).then(response => response.json());

export const put = (url, body) => fetch(url, {
  ...fetchParams,
  method: 'PUT',
  body: JSON.stringify(body),
}).then(response => response.json());

export const del = url => fetch(url, {
  ...fetchParams,
  method: 'DELETE',
});
