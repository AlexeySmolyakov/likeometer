import API from '../api';
import { FETCH_USER, FETCH_USER_STATE } from '../constants';

export const fetchUser = () => dispatch => {
  dispatch({
    type: FETCH_USER_STATE,
    payload: true,
  });

  return API.users.fetchUsers()
    .then(([user]) => {
      dispatch({
        type: FETCH_USER,
        payload: user,
      });
      return user;
    })
    .catch(error => {
      console.warn('[API ERROR USERS]', error);
    })
    .then(response => {
      dispatch({
        type: FETCH_USER_STATE,
        payload: false,
      });
      return response;
    });
};
