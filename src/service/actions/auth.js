import axiosClient from '../../shared/apis/axiosClient';

export const login = (username, password) => {
	return async (dispatch) => {
		try {
			const response = await axiosClient().post(`auth/login`, {
				username,
				password,
			});
			localStorage.setItem('token', response.data.token);
			localStorage.setItem('expiredToken', response.data.expired);
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
			const response = await axiosClient().post(`auth/register`, {
				firstName,
				lastName,
				phoneNumber,
				email,
				password,
				gender,
			});
			sessionStorage.setItem(
				'verificationCode',
				response.data.verificationCode
			);
			sessionStorage.setItem('expired', response.data.expired);
			dispatch({
				type: 'REGISTER',
				payload: response.data,
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

export const logout = () => (dispatch) => {
	localStorage.clear();
	sessionStorage.clear();
	dispatch({
		type: 'LOGOUT',
	});
};

export const autoLogin = (payload) => ({
	type: 'LOGIN',
	payload,
});

export const emailVerifyRegister = (
	code,
	firstName,
	lastName,
	phoneNumber,
	email,
	password,
	gender
) => {
	return async (dispatch) => {
		try {
			const expired = parseInt(sessionStorage.getItem('expired'));
			const now = new Date().getTime();
			if (now <= expired) {
				if (code === sessionStorage.getItem('verificationCode')) {
					await axiosClient()
						.post(`auth/register/verify`, {
							firstName,
							lastName,
							phoneNumber,
							email,
							password,
							gender,
						})
						.then(() => {
							sessionStorage.clear();
						});
					dispatch({
						type: 'EMAIL_VERIFY_REGISTER',
						payload: 'Success',
					});
				} else {
					dispatch({
						type: 'SET_AUTH_MESSAGE',
						payload: 'Wrong verification code',
					});
				}
			} else {
				dispatch({
					type: 'SET_AUTH_MESSAGE',
					payload: 'Verification code expired',
				});
			}
		} catch (err) {
			const { message } = err.response.data;
			dispatch({
				type: 'SET_AUTH_MESSAGE',
				payload: message,
			});
		}
	};
};

export const emailVerifyForgot = (code) => {
	return async (dispatch) => {
		try {
			const expired = parseInt(sessionStorage.getItem('expired'));
			const now = new Date().getTime();
			const userId = sessionStorage.getItem('user');
			if (now <= expired) {
				if (code === sessionStorage.getItem('verificationCode')) {
					await axiosClient()
						.post(`auth/forgot/${userId}/verify`, { code })
						.then(() => {
							sessionStorage.clear();
						});
					dispatch({
						type: 'EMAIL_VERIFY_FORGOT',
						payload: 'Success',
					});
				} else {
					dispatch({
						type: 'SET_AUTH_MESSAGE',
						payload: 'Wrong verification code',
					});
				}
			} else {
				dispatch({
					type: 'SET_AUTH_MESSAGE',
					payload: 'Verification code expired',
				});
			}
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
			const response = await axiosClient().post(`auth/forgot`, { email });
			sessionStorage.setItem('user', response.data.user);
			sessionStorage.setItem(
				'verificationCode',
				response.data.verificationCode
			);
			sessionStorage.setItem('expired', response.data.expired);
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
			const response = await axiosClient().post(`auth/forgot/verify`, code);
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

export const resetPassword = (password, confirmPassword) => {
	return async (dispatch) => {
		try {
			const token = localStorage.getItem('token');
			const response = await axiosClient(token).patch(`auth/reset`, {
				newPassword: password,
				confirmPassword: confirmPassword,
			});
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
