import axios from 'axios';

const AUTH_API_BASE_URL = 'http://localhost:8888/api/auth';

class AuthService {
	userRegister() {
		return axios.post(AUTH_API_BASE_URL + '/register');
	}

	userLogin(user) {
		return axios.post(AUTH_API_BASE_URL + '/login', user);
	}

	emailVerificationRegister() {
		return axios.post(AUTH_API_BASE_URL + '/register/verify');
	}

	emailVerificationForgotPassword() {
		return axios.post(AUTH_API_BASE_URL + '/forgot/verify');
	}

	forgotPassword() {
		return axios.post(AUTH_API_BASE_URL + '/forgot');
	}

	resetPassword() {
		return axios.post(AUTH_API_BASE_URL + '/reset');
	}
}

export default new AuthService();
