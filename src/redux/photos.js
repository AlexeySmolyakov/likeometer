/**
 * Photos.
 */

import { createSelector } from 'reselect';
import typeToReducer from 'type-to-reducer';
import { createAction } from 'redux-actions';
import { ActionType } from 'redux-promise-middleware';
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
    [ActionType.Pending]: state => {
      return {
        ...state,
        isFetching: true,
      };
    },
    [ActionType.Fulfilled]: (state, { payload }) => {
      return {
        ...state,
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
  photos: {},
  isFetching: false,
});