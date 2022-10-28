import axios from 'axios';

const SEATS_API_BASE_URL = 'http://localhost:8888/api/seats';

class SeatService {
	getAllSeatsAvailableByShowtime(showtimeId) {
		return axios.get(SEATS_API_BASE_URL + '/available/showtimes/' + showtimeId);
	}

	getAllSeatsOrderedByShowtime(moviesId) {
		return axios.get(SEATS_API_BASE_URL + '/ordered/showtimes/' + showtimeId);
	}
}

export default new SeatService();
