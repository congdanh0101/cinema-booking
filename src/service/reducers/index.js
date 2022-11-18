import { combineReducers } from 'redux';
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import hardSet from 'redux-persist/lib/stateReconciler/hardSet';

import authReducer from './auth';
import movieReducer from './movie';
import showtimeReducer from './showtime';
import orderReducer from './order';
import userReducer from './user';
import ticketReducer from './ticket';
import paymentReducer from './payment';
import seatReducer from './seat';
import theaterReducer from './theater';

const authConfig = {
	key: 'authReducer',
	storage,
	stateReconciler: hardSet,
};

const reducer = combineReducers({
	user: userReducer,
	auth: persistReducer(authConfig, authReducer),
	movie: movieReducer,
	showtime: showtimeReducer,
	order: orderReducer,
	ticket: ticketReducer,
	product: paymentReducer,
	seat: seatReducer,
	theater: theaterReducer,
});

export default reducer;
