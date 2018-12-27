import { createSelector } from 'reselect';
import typeToReducer from 'type-to-reducer';
import { createAction } from 'redux-actions';
import { PENDING, FULFILLED, REJECTED } from 'redux-promise-middleware';
import API from '../api';

// Cache
let GROUPS_CACHE = null;

const shouldFetchGroups = () => {
  if (GROUPS_CACHE) return Promise.resolve(GROUPS_CACHE);

  return API.groups.fetchGroups()
  .then(response => {
    GROUPS_CACHE = response;
    return response;
  });
};

// Actions
export const FETCH = createAction('groups/FETCH', shouldFetchGroups);

// Action creators
export const fetchGroups = options => dispatch => dispatch(FETCH(options));

// Selectors
export const groupsSelector = state => state.groups.groups.items || [];

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
        groups: payload,
        isFetching: false,
      };
    },
    [REJECTED]: (state, { payload }) => {
      return {
        ...state,
        error: true,
        isFetching: false,
        errorResponse: payload.response,
      };
    },
  },
}, {
  groups: {},
  isFetching: false,
});