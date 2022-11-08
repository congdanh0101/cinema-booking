const initialState = {
	seats: [],
	message: '',
	errorMsg: '',
};

const seatReducer = (state = initialState, action) => {
	switch (action.type) {
		case 'GET_ALL_SEAT_AVAILABLE_BY_SHOWTIME': {
			return {
				...state,
				seats: action.payload,
				message: action.message,
			};
		}
		case 'GET_ALL_SEAT_ORDERED_BY_SHOWTIME': {
			return {
				...state,
				seats: action.payload,
				message: action.message,
			};
		}
		case 'SET_SEAT_MESSAGE': {
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

export default seatReducer;
