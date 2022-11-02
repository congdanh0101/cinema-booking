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
				gender,
				phoneNumber,
				email,
				password,
			});
			console.log(response);
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

export const emailVerify = (code) => {
	return async (dispatch) => {
		try {
			const response = await http().post(`auth/register/verify`, code);
			dispatch({
				type: 'EMAIL_VERIFY',
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

export const forgetPassword = (email) => {
	return async (dispatch) => {
		try {
			const response = await http().post(`auth/forgot`, email);
			dispatch({
				type: 'FORGET_PASSWORD',
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

export const forgetPasswordVerify = (code) => {
	return async (dispatch) => {
		try {
			const response = await http().post(`auth/forgot/verify`, code);
			dispatch({
				type: 'FORGET_PASSWORD_VERIFY',
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

export const resetPassword = (password, token) => {
	return async (dispatch) => {
		try {
			const response = await http(token).patch(`auth/reset`, password);
			dispatch({
				type: 'RESET_PASSWORD',
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
