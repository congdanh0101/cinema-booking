const initialState = {
	users: [],
	detail: {},
	message: '',
	errorMsg: '',
};

const userReducer = (state = initialState, action) => {
	switch (action.type) {
		case 'GET_ALL_USER': {
			return {
				...state,
				users: action.payload,
				message: action.message,
			};
		}
		case 'GET_USER_DETAIL': {
			return {
				...state,
				users: action.payload,
				message: action.message,
			};
		}
		case 'ADD_USER': {
			return {
				...state,
				detail: action.payload,
				message: action.message,
			};
		}
		case 'UPDATE_USER': {
			return {
				...state,
				detail: action.payload,
				message: action.message,
			};
		}
		case 'DELETE_USER': {
			return {
				...state,
				detail: action.payload,
				message: action.message,
			};
		}
		case 'SET_USER_MESSAGE': {
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

export default userReducer;
