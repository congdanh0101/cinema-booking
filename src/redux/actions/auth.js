import http from '../../helpers/config';

export const login = (username, password) => {
	return async (dispatch) => {
		try {
			const response = await http().post(`auth/login`, { username, password });
			localStorage.setItem('token', response.data.token);
			dispatch({
				type: 'LOGIN',
				payload: response.data.token,
				message: response.data.message,
			});
		} catch (err) {
			const { message } = err.response.data;
			dispatch({
				type: 'SET_AUTH_MESSAGE',
				payload: message,
			});
		}
	};
};

export const register = (
	firstName,
	lastName,
	phoneNumber,
	email,
	password,
	gender
) => {
	return async (dispatch) => {
		try {
			const response = await http().post(`auth/register`, {
				firstName,
				lastName,
				phoneNumber,
				email,
				password,
				gender,
			});
			dispatch({
				type: 'REGISTER',
				message: response.data.message,
			});
		} catch (err) {
			const { message } = err.response.data;
			dispatch({
				type: 'SET_AUTH_MESSAGE',
				payload: message,
			});
		}
	};
};

export const logout = (token) => (dispatch) => {
	localStorage.removeItem(token);
	dispatch({
		type: 'LOGOUT',
	});
};

export const autoLogin = (payload) => ({
	type: 'LOGIN',
	payload,
});
