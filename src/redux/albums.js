import { createSelector } from 'reselect';
import typeToReducer from 'type-to-reducer';
import { createAction } from 'redux-actions';
import { PENDING, FULFILLED, REJECTED } from 'redux-promise-middleware';
import API from '../api';
import { userSelector } from './user';

// Actions
export const FETCH = createAction('albums/FETCH', API.photos.fetchAlbums);

// Action creators
export const fetchAlbums = options => dispatch => dispatch(FETCH(options));

// Selectors
export const albumsSelector = state => state.albums;

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
      const ownerId = payload.count > 0 && payload.items ?
        payload.items[0].owner_id :
        userSelector(state).id;

      return {
        ...state,
        [ownerId]: payload,
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
  albums: {},
  isFetching: false,
});