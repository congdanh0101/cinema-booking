import { applyMiddleware } from 'redux';
import { configureStore } from '@reduxjs/toolkit';
import { persistStore } from 'redux-persist';
import thunk from 'redux-thunk';
import logger from 'redux-logger';
import rootReducer from './reducers';

const initialState = {};

const persistedStore = () => {
	const store = configureStore(
		rootReducer,
		initialState,
		applyMiddleware(thunk, logger)
	);

	const persistor = persistStore(store);
	return { store, persistor };
};

export default persistedStore;
