import { createSelector } from 'reselect';
import typeToReducer from 'type-to-reducer';
import { createAction } from 'redux-actions';
import { ActionType } from 'redux-promise-middleware';
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

export const groupByIdSelector = groupId => createSelector(
  groupsSelector,
  groups => groups.find(i => i.id === -groupId),
);

// Reducer
export default typeToReducer({
  [FETCH]: {
    [ActionType.Pending]: state => {
      return {
        ...state,
        isFetching: true,
      };
    },
    [ActionType.Fulfilled]: (state, { payload }) => {
      return {
        ...state,
        groups: payload,
        isFetching: false,
      };
    },
    [ActionType.Rejected]: (state, { payload }) => {
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