import { combineReducers } from 'redux'
import user from './user'
import users from './users'
import bills from './bills'
import companies from './companies'
import companyCategories from './companyCategories'

export default combineReducers({
	user,
	users,
	bills,
	companies,
	companyCategories,
})