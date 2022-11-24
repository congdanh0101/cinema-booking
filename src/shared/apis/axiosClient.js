import { default as axios } from 'axios';
const { REACT_APP_API: API_URL } = process.env;

const axiosClient = (token = null) => {
	const expired = localStorage.getItem('expiredToken');
	const now = new Date().getTime();
	// if (now <= expired) {
	// 	localStorage.clear();
	// 	sessionStorage.clear();
	// } else {
	// 	const headers = token && {
	// 		authorization: `Bearer ${token}`,
	// 	};
	// 	return axios.create({
	// 		baseURL: API_URL,
	// 		headers,
	// 	});
	// }

	const headers = token && {
		authorization: `Bearer ${token}`,
	};
	return axios.create({
		baseURL: API_URL,
		headers,
	});
};

export default axiosClient;
