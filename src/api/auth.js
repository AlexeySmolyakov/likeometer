import VK from 'VK';
import { fetchUsers } from './users';

const settings = 262150;

/**
 * Check auth.
 * @return {Promise<Object>}
 */
export function checkAuth() {
  return new Promise((resolve, reject) => {
    VK.Auth.getLoginStatus(response => {
      if (response.status === 'connected') {
        resolve(response);
      } else {
        reject(response);
      }
    });
  });
}

/**
 * Fetch current user.
 * @return {Promise<Object>}
 */
export function fetchCurrentUser() {
  return fetchUsers()
    .then(response => response[0]);
}

export function login() {
  return new Promise((resolve, reject) => {
    VK.Auth.login(response => {
      if (response.status === 'connected') {
        resolve(response);
      } else {
        reject(response);
      }
    }, settings);
  });
}
