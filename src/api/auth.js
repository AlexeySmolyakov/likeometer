import VK from 'VK';
import { fetchUsers } from './users';

const settings = 262150;

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

export function fetchCurrentUser() {
  return fetchUsers()
    .then(response => response[0]);
}

export function login() {
  return new Promise((resolve, reject) => {
    VK.Auth.login(response => {
      console.warn(response);
      resolve(response);
    }, settings);
  });
}

export function logout() {

}
