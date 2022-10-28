import axios from 'axios';

const AUTH_API_BASE_URL = 'http://localhost:8888/api/auth';

class AuthService {
	userRegister(user) {
		return axios.post(AUTH_API_BASE_URL + '/register', user);
	}

	userLogin(user) {
		return axios.post(AUTH_API_BASE_URL + '/login', user);
	}

	emailVerificationRegister(code) {
		return axios.post(AUTH_API_BASE_URL + '/register/verify', code);
	}

	emailVerificationForgotPassword(code) {
		return axios.post(AUTH_API_BASE_URL + '/forgot/verify', code);
	}

	forgotPassword(email) {
		return axios.post(AUTH_API_BASE_URL + '/forgot', email);
	}

	resetPassword(newPass, confirmPass) {
		return axios.post(AUTH_API_BASE_URL + '/reset', { newPass, confirmPass });
	}

	logout() {
		localStorage.removeItem('user');
	}

	getCurrentUser() {
		return JSON.parse(localStorage.getItem('user'));
	}
}

export default new AuthService();
