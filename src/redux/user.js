import { createSelector } from 'reselect';
import typeToReducer from 'type-to-reducer';
import { createAction } from 'redux-actions';
import { PENDING, FULFILLED, REJECTED } from 'redux-promise-middleware';
import API from '../api';

// Actions
export const FETCH = createAction('user/FETCH', API.auth.fetchCurrentUser);
export const CHECK_AUTH = createAction('user/CHECK_AUTH', API.auth.checkAuth);

// Action creators
export const fetchUser = options => dispatch => dispatch(FETCH(options));
export const checkAuth = options => dispatch => dispatch(CHECK_AUTH(options));

// Selectors
export const userSelector = state => state.user.user;

// Reducer
export default typeToReducer({
  [FETCH]: {
    [PENDING]: state => {
      return {
        ...state,
        isFetching: true,
      };
    },
    [FULFILLED]: (state, { payload }) => {
      return {
        ...state,
        user: payload,
        isFetching: false,
      };
    },
    [REJECTED]: (state, { payload }) => {
      return {
        ...state,
        error: true,
        errorResponse: payload.response,
        data: { id: 0 },
        isFetching: false,
      };
    },
  },
  [CHECK_AUTH]: {
    [PENDING]: state => {
      return {
        ...state,
        checkingAuth: true,
      };
    },
    [FULFILLED]: (state) => {
      return {
        ...state,
        checkingAuth: false,
      };
    },
    [REJECTED]: (state) => {
      return {
        ...state,
        checkingAuth: false,
      };
    },
  },
}, {
  isFetching: false,
  checkingAuth: true,
  user: { id: null },
});