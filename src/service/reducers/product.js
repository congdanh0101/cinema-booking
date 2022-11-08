const initialState = {
	products: [],
	message: '',
	errorMsg: '',
};

const productReducer = (state = initialState, action) => {
	switch (action.type) {
		case 'GET_ALL_PRODUCT': {
			return {
				...state,
				products: action.payload,
				message: action.message,
			};
		}
		case 'SET_PRODUCT_MESSAGE': {
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

export default productReducer;
