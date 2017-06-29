import { createStore, applyMiddleware } from 'redux'
import rootReducer from '../reducers'
import thunk from 'redux-thunk'

import { createLogger } from 'redux-logger';
const logger = createLogger({ collapsed: true });

export default function configureStore (initialState) {
	const store = createStore(
		rootReducer,
		initialState,
		applyMiddleware(thunk, logger)
	);

	if (module.hot) {
		module.hot.accept('../reducers', () => {
			const nextRootReducer = require('../reducers')
			store.replaceReducer(nextRootReducer)
		})
	}

	return store
}