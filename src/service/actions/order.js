import axiosClient from '../../shared/apis/axiosClient';

export const createOrder = (
	dataLocation,
	dataDate,
	dataShowtime,
	dataMovie
) => {
	return async (dispatch) => {
		const params = new URLSearchParams();
		params.append('dataShowtime', dataShowtime);
		params.append('dataMovie', dataMovie);
		params.append('dataDate', dataDate);
		params.append('dataLocation', dataLocation);
		const data = { dataLocation, dataDate, dataShowtime, dataMovie };
		try {
			dispatch({
				type: 'CREATE_ORDER',
				payload: data,
			});
		} catch (err) {
			dispatch({
				type: 'SET_ORDER_MESSAGE',
				payload: err,
			});
		}
	};
};

export const createSeat = (seatOrder) => {
	return async (dispatch) => {
		const params = new URLSearchParams();
		params.append('seatOrder', seatOrder);
		const data = { seatOrder };
		try {
			dispatch({
				type: 'CREATE_SEAT',
				payload: data,
			});
		} catch (err) {
			dispatch({
				type: 'SET_ORDER_MESSAGE',
				payload: err,
			});
		}
	};
};

export const getAllOrders = () => {
	return async (dispatch) => {
		try {
			const response = await axiosClient().get(`orders`);
			dispatch({
				type: 'GET_ALL_ORDER',
				payload: response.data,
			});
		} catch (err) {
			dispatch({
				type: 'SET_ORDER_MESSAGE',
				payload: err,
			});
		}
	};
};

export const getOrderById = (id) => {
	return async (dispatch) => {
		try {
			const response = await axiosClient().get(`orders/${id}`);
			dispatch({
				type: 'GET_ODER_BY_ID',
				payload: response.data,
				message: response.data.message,
			});
		} catch (err) {
			dispatch({
				type: 'SET_ORDER_MESSAGE',
				payload: err,
			});
		}
	};
};

export const getAllOrdersByUser = (userId) => {
	return async (dispatch) => {
		try {
			const response = await axiosClient().get(`orders/users/${userId}`);
			dispatch({
				type: 'GET_ALL_ORDER_BY_USER',
				payload: response.data,
				message: response.data.message,
			});
		} catch (err) {
			dispatch({
				type: 'SET_ORDER_MESSAGE',
				payload: err,
			});
		}
	};
};

export const getAllOrderDetailsByOrder = (orderId) => {
	return async (dispatch) => {
		try {
			const response = await axiosClient().get(`orders/${orderId}/detail`);
			dispatch({
				type: 'GET_ALL_ORDER_DETAILS_BY_ORDER',
				payload: response.data,
				message: response.data.message,
			});
		} catch (err) {
			dispatch({
				type: 'SET_ORDER_MESSAGE',
				payload: err,
			});
		}
	};
};

export const getOrderDetailsById = (orderId) => {
	return async (dispatch) => {
		try {
			const response = await axiosClient().get(`orders/detail/${orderId}`);
			dispatch({
				type: 'GET_ORDER_DETAILS_BY_ID',
				payload: response.data,
				message: response.data.message,
			});
		} catch (err) {
			dispatch({
				type: 'SET_ORDER_MESSAGE',
				payload: err,
			});
		}
	};
};

export const deleteOrderById = (orderId) => {
	return async (dispatch) => {
		try {
			const token = localStorage.getItem('token');
			const response = await axiosClient(token).delete(`orders/${orderId}`);
			dispatch({
				type: 'DELETE_ORDER_BY_ID',
				payload: response.data,
				message: response.data.message,
			});
		} catch (err) {
			dispatch({
				type: 'SET_MOVIE_MESSAGE',
				payload: err,
			});
		}
	};
};
