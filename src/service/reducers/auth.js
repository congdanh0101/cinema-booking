const initialState = {
	token: null,
	user: {},
	errorMsg: '',
	message: '',
};

const authReducer = (state = initialState, action) => {
	switch (action.type) {
		case 'LOGIN': {
			return {
				...state,
				token: action.payload,
				message: action.message,
				errorMsg: '',
			};
		}
		case 'REGISTER': {
			return {
				...state,
				user: action.payload.user,
				message: action.message,
				errorMsg: '',
			};
		}
		case 'LOGOUT': {
			return {
				...state,
				token: null,
				user: {},
			};
		}
		case 'EMAIL_VERIFY_REGISTER': {
			return {
				...state,
				message: action.payload,
			};
		}
		case 'EMAIL_VERIFY_FORGOT': {
			return {
				...state,
				message: action.payload,
			};
		}
		case 'FORGET_PASSWORD': {
			return {
				...state,
				message: action.message,
			};
		}
		case 'FORGET_PASSWORD_VERIFY': {
			return {
				...state,
				message: action.message,
			};
		}
		case 'RESET_PASSWORD': {
			return {
				...state,
				message: action.message,
			};
		}
		case 'SET_AUTH_MESSAGE': {
			return {
				...state,
				message: '',
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

export default authReducer;
