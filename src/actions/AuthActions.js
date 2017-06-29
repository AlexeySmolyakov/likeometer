import API from '../api';
import { setUser } from './UserActions'

export const checkAuth = () => {
	return (dispatch) => {
		return API.auth.checkAuth()
		.then((response) => {
			return dispatch(setUser(response.data.user || { id: 0 }))
		})
	}
};

export const login = (credentials) => {
	return (dispatch) => {
		return API.auth.login(credentials)
		.then((response) => {
			dispatch(setUser(response.user))
		})
	}
};

export const logout = () => {
	return (dispatch) => {
		return API.auth.logout()
		.then(() => {
			dispatch(setUser({ id: 0 }))
		})
	}
};