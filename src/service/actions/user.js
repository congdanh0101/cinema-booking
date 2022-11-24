import axiosClient from '../../shared/apis/axiosClient';

export const getAllUser = () => {
	return async (dispatch) => {
		try {
			const response = await axiosClient().get(`users/`);
			dispatch({
				type: 'GET_ALL_USER',
				payload: response.data,
				message: response.data.message,
			});
		} catch (err) {
			const { message } = err.response.data;
			dispatch({
				type: 'SET_USER_MESSAGE',
				payload: message,
			});
		}
	};
};

export const getUserDetail = (token) => {
	return async (dispatch) => {
		try {
			const bearerToken = localStorage.getItem('token');
			const response = await axiosClient(bearerToken).post(`users`, {
				token: token,
			});
			dispatch({
				type: 'GET_USER_DETAIL',
				payload: response.data,
				message: response.data.message,
			});
		} catch (err) {
			const { message } = err.response.data;
			dispatch({
				type: 'SET_USER_MESSAGE',
				payload: message,
			});
		}
	};
};

export const getUserDetailById = (id) => {
	return async (dispatch) => {
		try {
			const response = await axiosClient().get(`users/${id}`);
			dispatch({
				type: 'GET_USER_DETAIL_BY_ID',
				payload: response.data,
				message: response.data.message,
			});
		} catch (err) {
			const { message } = err.response.data;
			dispatch({
				type: 'SET_USER_MESSAGE',
				payload: message,
			});
		}
	};
};

export const addUser = (
	firstName,
	lastName,
	phoneNumber,
	email,
	password,
	gender
) => {
	return async (dispatch) => {
		try {
			const token = localStorage.getItem('token');
			const response = await axiosClient(token).post(`users`, {
				firstName,
				lastName,
				phoneNumber,
				email,
				password,
				gender,
			});
			dispatch({
				type: 'ADD_USER',
				payload: response.data.results,
				message: response.data.message,
			});
		} catch (err) {
			const { message } = err.response.data;
			dispatch({
				type: 'SET_USER_MESSAGE',
				payload: message,
			});
		}
	};
};

export const updateUser = (id, data) => {
	return async (dispatch) => {
		try {
			const bearerToken = localStorage.getItem('token');
			const response = await axiosClient(bearerToken).put(`users/${id}`, data);
			dispatch({
				type: 'UPDATE_USER',
				payload: response.data,
				message: response.data.message,
			});
		} catch (err) {
			const { message } = err.response.data;
			dispatch({
				type: 'SET_USER_MESSAGE',
				payload: message,
			});
		}
	};
};

export const deleteUser = (userId) => {
	return async (dispatch) => {
		try {
			const token = localStorage.getItem('token');
			const response = await axiosClient(token).delete(`users/${userId}`);
			dispatch({
				type: 'DELETE_MOVIE',
				payload: response.data,
				message: response.data.message,
			});
		} catch (err) {
			const { message } = err.response.data;
			dispatch({
				type: 'SET_USER_MESSAGE',
				payload: message,
			});
		}
	};
};

export const changePassword = (data) => {
	return async (dispatch) => {
		try {
			const token = localStorage.getItem('token');
			const userId = sessionStorage.getItem('userId');
			const response = await axiosClient(token).put(
				`users/changepassword/${userId}`,
				data
			);

			dispatch({
				type: 'CHANGE_PASSWORD',
				payload: response.data,
				message: response.data.message,
			});
		} catch (err) {
			const { message } = err.response.data;
			dispatch({
				type: 'SET_USER_MESSAGE',
				payload: message,
			});
		}
	};
};
