import axiosClient from '../../shared/apis/axiosClient2';

export const index = (paymentId) => {
	return async (dispatch) => {
		try {
			const response = await axiosClient().get(`${paymentId}`);
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
			const response = await axiosClient().post(`pay`);
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
			const { message } = err.response.data;
			dispatch({
				type: 'SET_PAYMENT_MESSAGE',
				payload: message,
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
			const { message } = err.response.data;
			dispatch({
				type: 'SET_PAYMENT_MESSAGE',
				payload: message,
			});
		}
	};
};
