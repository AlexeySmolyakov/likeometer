import API from '../api';
import { fetchUser } from './UserActions';
import { CHECKING_AUTH } from '../constants';

export const checkAuth = () => dispatch => API.auth.checkAuth()
  .then(() => dispatch(fetchUser()))
  .catch(error => {
    console.warn('[API ERROR AUTH]', error);
  })
  .then(() => {
    dispatch({
      type: CHECKING_AUTH,
      payload: false,
    });
  });

export const login = credentials => dispatch => API.auth.login(credentials)
  .then(response => {
    dispatch(checkAuth());
  })
  .catch(error => {
    console.warn('[API ERROR AUTH]', error);
  })
  .then(() => {
    dispatch({
      type: CHECKING_AUTH,
      payload: false,
    });
  });

export const logout = () => dispatch => API.auth.logout()
  .then(response => {
    console.warn(response);
  });
