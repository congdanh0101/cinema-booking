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
			dispatch({
				type: 'SET_USER_MESSAGE',
				payload: err,
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

export const getUserDetailById = (id) => {
	return async (dispatch) => {
		try {
			const bearerToken = localStorage.getItem('token');
			const response = await http(bearerToken).get(`users/${id}`);
			dispatch({
				type: 'GET_USER_DETAIL_BY_ID',
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
			dispatch({
				type: 'SET_USER_MESSAGE',
				payload: err,
			});
		}
	};
};

export const updateUser = (id, data) => {
	return async (dispatch) => {
		try {
			const bearerToken = localStorage.getItem('token');
			const response = await http(bearerToken).put(`users/${id}`, data);
			dispatch({
				type: 'UPDATE_USER',
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

export const deleteUser = (userId) => {
	return async (dispatch) => {
		try {
			const token = localStorage.getItem('jwtToken');
			const response = await http(token).delete(`user/${userId}`);
			dispatch({
				type: 'DELETE_MOVIE',
				payload: response.data.results,
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
