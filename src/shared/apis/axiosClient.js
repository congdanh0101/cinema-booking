import { default as axios } from 'axios';
const { REACT_APP_API: API_URL } = process.env;

const axiosClient = (token = null) => {
	return axios.create({
		baseURL: API_URL,
		headers: {
			Authorization: `Bearer ${token}`,
			'Content-Type': 'application/json',
		},
	});
};

export default axiosClient;
