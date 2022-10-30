import axios from 'axios';

const ORDER_API_BASE_URL = 'http://localhost:8888/api/orders';

class OrderService {
	createOrder() {
		return axios.post(ORDER_API_BASE_URL);
	}
}

export default new OrderService();
