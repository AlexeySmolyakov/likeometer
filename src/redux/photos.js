/**
 * Photos.
 */

import { createSelector } from 'reselect';
import typeToReducer from 'type-to-reducer';
import { createAction } from 'redux-actions';
import { PENDING, FULFILLED, REJECTED } from 'redux-promise-middleware';
import API from '../api';

// Actions
export const FETCH = createAction('photos/FETCH', API.photos.fetchPhotos);

// Action creators
export const fetchPhotos = options => dispatch => dispatch(FETCH(options));

// Selectors
export const photosSelector = state => state.photos;

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
  photos: {},
  isFetching: false,
});