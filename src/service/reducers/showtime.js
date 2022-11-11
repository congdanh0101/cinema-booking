const initialState = {
	showtimes: [],
	details: {},
	message: '',
	errorMsg: '',
};

const showtimeReducer = (state = initialState, action) => {
	switch (action.type) {
		case 'GET_ALL_SHOWTIME': {
			return {
				...state,
				showtimes: action.payload,
			};
		}
		case 'GET_SHOWTIME_DETAIL': {
			return {
				...state,
				details: action.payload,
				message: action.message,
			};
		}
		case 'ADD_SHOWTIME': {
			return {
				...state,
				details: action.payload,
				message: action.message,
			};
		}
		case 'UPDATE_SHOWTIME': {
			return {
				...state,
				details: action.payload,
				message: action.message,
			};
		}
		case 'DELETE_SHOWTIME': {
			return {
				...state,
				details: action.payload,
				message: action.message,
			};
		}
		case 'DELETE_SHOWTIME_FORCE': {
			return {
				...state,
				details: action.payload,
				message: action.message,
			};
		}
		case 'SET_SHOWTIME_MESSAGE': {
			return {
				...state,
				errorMsg: action.payload,
			};
		}
		default: {
			return {
				...state,
			};
		}
	}
};

export default showtimeReducer;