import axios from 'axios';

const USERS_API_BASE_URL = 'http://localhost:8888/api/users';

class UsersService {
	createUsers() {
		return axios.post(USERS_API_BASE_URL);
	}

	getListUsers() {
		return axios.get(USERS_API_BASE_URL);
	}

	getUsersById(userId) {
		return axios.get(USERS_API_BASE_URL + '/' + userId);
	}

	updateUsersById(userId) {
		return axios.put(USERS_API_BASE_URL + '/' + userId);
	}

	changePassword(userId) {
		return axios.put(USERS_API_BASE_URL + '/changepassword/' + userId);
	}

	deleteUsersById(userId) {
		return axios.delete(USERS_API_BASE_URL + '/' + userId);
	}
}

export default new UsersService();
