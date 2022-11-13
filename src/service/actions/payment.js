import axiosClient from '../../shared/apis/axiosClient';

export const index = () => {
	return async (dispatch) => {
		try {
			const response = await axiosClient().get(`products`);
			dispatch({
				type: 'INDEX',
				payload: response.data,
				message: response.data.message,
			});
		} catch (err) {
			dispatch({
				type: 'SET_PAYMENT_MESSAGE',
				payload: err,
			});
		}
	};
};

export const pay = () => {
	return async (dispatch) => {
		try {
			const response = await axiosClient().get(`products`);
			dispatch({
				type: 'PAY',
				payload: response.data,
				message: response.data.message,
			});
		} catch (err) {
			dispatch({
				type: 'SET_PAYMENT_MESSAGE',
				payload: err,
			});
		}
	};
};

export const cancelPay = () => {
	return async (dispatch) => {
		try {
			const response = await axiosClient().get(`products`);
			dispatch({
				type: 'CANCEL_PAY',
				payload: response.data,
				message: response.data.message,
			});
		} catch (err) {
			dispatch({
				type: 'SET_PAYMENT_MESSAGE',
				payload: err,
			});
		}
	};
};

export const successPay = () => {
	return async (dispatch) => {
		try {
			const response = await axiosClient().get(`products`);
			dispatch({
				type: 'SUCCESS_PAY',
				payload: response.data,
				message: response.data.message,
			});
		} catch (err) {
			dispatch({
				type: 'SET_PAYMENT_MESSAGE',
				payload: err,
			});
		}
	};
};
