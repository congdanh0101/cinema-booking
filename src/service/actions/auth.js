import axiosClient from '../../shared/apis/axiosClient';

export const login = (username, password) => {
	return async (dispatch) => {
		try {
			const response = await axiosClient().post(`auth/login`, {
				username,
				password,
			});
			localStorage.setItem('token', response.data.token);
			dispatch({
				type: 'LOGIN',
				payload: response.data.token,
				message: response.data.message,
			});
		} catch (err) {
			dispatch({
				type: 'SET_AUTH_MESSAGE',
				payload: err,
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
			sessionStorage.setItem('firstName', response.data.user.firstName);
			sessionStorage.setItem('lastName', response.data.user.lastName);
			sessionStorage.setItem('phoneNumber', response.data.user.phoneNumber);
			sessionStorage.setItem('email', response.data.user.email);
			sessionStorage.setItem('password', response.data.user.password);
			sessionStorage.setItem('gender', response.data.user.gender);
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
			dispatch({
				type: 'SET_AUTH_MESSAGE',
				payload: err,
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

export const emailVerifyRegister = (code) => {
	return async (dispatch) => {
		try {
			const expired = sessionStorage.getItem('expired');
			const now = new Date().getTime();
			if (now <= expired) {
				if (code === sessionStorage.getItem('verificationCode')) {
					const response = await axiosClient()
						.post(`auth/register/verify`, {
							firstName: sessionStorage.getItem('firstName'),
							lastName: sessionStorage.getItem('lastName'),
							phoneNumber: sessionStorage.getItem('phoneNumber'),
							email: sessionStorage.getItem('email'),
							password: sessionStorage.getItem('password'),
							gender: sessionStorage.getItem('gender'),
						})
						.then((res) => {
							sessionStorage.clear();
						});
					dispatch({
						type: 'EMAIL_VERIFY',
						message: response.data.message,
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
			dispatch({
				type: 'SET_AUTH_MESSAGE',
				payload: err,
			});
		}
	};
};

export const emailVerifyForgot = (code) => {
	return async (dispatch) => {
		try {
			const expired = sessionStorage.getItem('expired');
			const now = new Date().getTime();
			const userId = sessionStorage.getItem('user');
			if (now <= expired) {
				if (code === sessionStorage.getItem('verificationCode')) {
					const response = await axiosClient()
						.post(`auth/forgot/${userId}/verify`, { code })
						.then((res) => {
							sessionStorage.clear();
						});
					dispatch({
						type: 'EMAIL_VERIFY',
						message: response.data.message,
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
			dispatch({
				type: 'SET_AUTH_MESSAGE',
				payload: err,
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
			dispatch({
				type: 'SET_AUTH_MESSAGE',
				payload: err,
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
			dispatch({
				type: 'SET_AUTH_MESSAGE',
				payload: err,
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
			dispatch({
				type: 'SET_AUTH_MESSAGE',
				payload: err,
			});
		}
	};
};
