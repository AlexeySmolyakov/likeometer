import { createSelector } from 'reselect';
import typeToReducer from 'type-to-reducer';
import { createAction } from 'redux-actions';
import { ActionType } from 'redux-promise-middleware';
import API from '../api';
import { userSelector } from './user';

// Actions
export const FETCH = createAction('albums/FETCH', API.photos.fetchAlbums);

// Action creators
export const fetchAlbums = options => (dispatch, getState) => {
  const state = getState();
  const albums = albumsSelector(state);
  const ownerAlbums = albums[options.owner_id];

  if (ownerAlbums) return;
  return dispatch(FETCH(options));
};

// Selectors
export const albumsSelector = state => state.albums;

export const albumByIdSelector = (ownerId, albumId) => createSelector(
  albumsSelector,
  albums => {
    if (!albums[ownerId]) return null;

    return albums[ownerId].items.find(i => i.id === albumId);
  },
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
      const ownerId = payload.count > 0 && payload.items ?
        payload.items[0].owner_id :
        userSelector(state).id;

      return {
        ...state,
        [ownerId]: payload,
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
  isFetching: false,
});