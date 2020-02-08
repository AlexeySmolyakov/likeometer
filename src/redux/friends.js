import { createSelector } from 'reselect';
import typeToReducer from 'type-to-reducer';
import { createAction } from 'redux-actions';
import { ActionType } from 'redux-promise-middleware';
import API from '../api';
import { groupsSelector } from './groups';

// Cache
let FRIENDS_CACHE = null;

const shouldFetchFriends = () => {
  if (FRIENDS_CACHE) return Promise.resolve(FRIENDS_CACHE);

  return API.friends.fetchFriends()
  .then(response => {
    FRIENDS_CACHE = response;
    return response;
  });
};

// Actions
export const FETCH = createAction('friends/FETCH', shouldFetchFriends);

// Action creators
export const fetchFriends = options => dispatch => dispatch(FETCH(options));

// Selectors
export const friendsSelector = state => state.friends.friends.items || [];

export const friendByIdSelector = friendId => createSelector(
  friendsSelector,
  friends => friends.find(i => i.id === friendId),
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
        friends: payload,
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
  friends: {},
  isFetching: false,
});