import http from '../../shared/helpers/config';

export const getAllUser = () => {
	return async (dispatch) => {
		try {
			const response = await http().get(`users`);
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
			const response = await http(bearerToken).post(`users`, {
				token: token,
			});
			dispatch({
				type: 'GET_USER_DETAIL',
				payload: response.data,
				message: response.data.message,
			});
		} catch (err) {
			dispatch({
				type: 'SET_USER_MESSAGE',
				payload: err,
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
			dispatch({
				type: 'SET_USER_MESSAGE',
				payload: '',
				message: '',
			});
			const token = localStorage.getItem('jwtToken');
			const response = await http(token).post(`users`, {
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

export const updateUser = (
	userId,
	firstName,
	lastName,
	phoneNumber,
	email,
	password,
	gender
) => {
	return async (dispatch) => {
		try {
			dispatch({
				type: 'SET_USER_MESSAGE',
				message: '',
			});
			const token = localStorage.getItem('jwtToken');
			const response = await http(token).put(`user/${userId}`, {
				firstName,
				lastName,
				phoneNumber,
				email,
				password,
				gender,
			});
			dispatch({
				type: 'UPDATE_USER',
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

export const deleteUser = (userId) => {
	return async (dispatch) => {
		try {
			dispatch({
				type: 'SET_USER_MESSAGE',
				message: '',
			});
			const token = localStorage.getItem('jwtToken');
			const response = await http(token).delete(`user/${userId}`);
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
