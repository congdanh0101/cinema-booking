import http from '../../shared/helpers/config';

export const getProducts = () => {
	return async (dispatch) => {
		try {
			const response = await http().get(`products`);
			dispatch({
				type: 'GET_ALL_PRODUCT',
				payload: response.data,
				message: response.data.message,
			});
		} catch (err) {
			const { message } = err.response.data;
			dispatch({
				type: 'SET_PRODUCT_MESSAGE',
				payload: message,
			});
		}
	};
};
