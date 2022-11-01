import http from '../../helpers/config';

export const getAllUser = () => {
	return async (dispatch) => {
		try {
			dispatch({
				type: 'SET_USER_MESSAGE',
				payload: '',
				message: '',
			});
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

export const userDetail = (token) => {
	return async (dispatch) => {
		try {
			dispatch({
				type: 'SET_USER_MESSAGE',
				payload: '',
				message: '',
			});
			const response = await http(token).get(`users`);
			console.log(response);
			dispatch({
				type: 'GET_USER',
				payload: response.data.results,
				message: response.data.message,
			});
		} catch (err) {
			dispatch({
				type: 'SET_USER_MESSAGE',
			});
		}
	};
};

export const addUser = () => {
	return async (dispatch) => {

		try {
			dispatch({
				type: 'SET_USER_MESSAGE',
				payload: '',
				message: '',
			});
			const response = await http().post(`users`);
			dispatch({
				type: 'ADD_USER',
				payload: response.data.results,
				message: response.data.message,
			});
		} catch (err) {
			dispatch({
				type: 'SET_USER_MESSAGE',
			});
		}
	};
};

export const updateUser = (token, data) => {
	return async (dispatch) => {
		const params = new FormData();
		if (data.firstName) {
			params.append(data.firstName);
		}
		if (data.lastName) {
			params.append(data.lastName);
		}
		if (data.phoneNumber) {
			params.append(data.phoneNumber);
		}
		if (data.email) {
			params.append(data.email);
		}
		if (data.password) {
			params.append(data.password);
		}
		if (data.gender) {
			params.append(data.gender);
		}
		try {
			dispatch({
				type: 'SET_USER_MESSAGE',
				message: '',
			});
			const response = await http(token).patch('user', params);
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
