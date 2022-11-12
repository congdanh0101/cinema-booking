const initialState = {
	payment: [],
	message: '',
	errorMsg: '',
};

const paymentReducer = (state = initialState, action) => {
	switch (action.type) {
		case 'INDEX': {
			return {
				...state,
				payment: action.payload,
				message: action.message,
			};
		}
		case 'PAY': {
			return {
				...state,
				payment: action.payload,
				message: action.message,
			};
		}
		case 'CANCEL_PAY': {
			return {
				...state,
				payment: action.payload,
				message: action.message,
			};
		}
		case 'SUCCESS_PAY': {
			return {
				...state,
				payment: action.payload,
				message: action.message,
			};
		}
		case 'SET_PAYMENT_MESSAGE': {
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

export default paymentReducer;
