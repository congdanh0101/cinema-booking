import axios from 'axios';

const SHOWTIME_API_BASE_URL = 'http://localhost:8888/api/showtimes';

class ShowtimeService {
	createShowtime(movieId, theaterId) {
		return axios.post(
			SHOWTIME_API_BASE_URL + '/movie' + movieId + '/theaters/' + theaterId
		);
	}

	updateShowtime(movieId, theaterId) {
		return axios.put(
			SHOWTIME_API_BASE_URL + '/movie' + movieId + '/theaters/' + theaterId
		);
	}

	deleteShowtime(showtimeId) {
		return axios.delete(SHOWTIME_API_BASE_URL + '/' + showtimeId);
	}

	deleteShowtimeForce(showtimeId) {
		return axios.delete(SHOWTIME_API_BASE_URL + '/force/' + showtimeId);
	}

	getShowtimes() {
		return axios.get(SHOWTIME_API_BASE_URL);
	}
}

export default new ShowtimeService();
