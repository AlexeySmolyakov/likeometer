export const ping = store => next => action => {
	console.log(`Тип события: ${action.type}, дополнительные данные события: ${action.payload}`)
	console.warn(store.getState())
	return next(action)
}