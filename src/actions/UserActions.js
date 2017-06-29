import API from '../api';
import { FETCH_USER, SET_USER } from '../constants'

export const setUser = (user) => {
	return {
		type: SET_USER,
		payload: user
	}
};

export const fetchUser = (userId) => {
	return (dispatch) => {
		dispatch({
			type: FETCH_USER,
			payload: {
				isFetching: true
			}
		});

		API.user.fetch()
		.then((response) => {
			console.warn(response)
		})
	}
};

export const saveUser = (user) => {
	return (dispatch) => {
		return API.user.save(user)
		.then(response => {
			dispatch(setUser(response.data))
		})
	}
};