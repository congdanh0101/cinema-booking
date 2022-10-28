import axios from 'axios';

const SHOWTIME_API_BASE_URL = 'http://localhost:8888/api/tickets';

class TicketService {
	createTicket(showtimeId, seatId) {
		return axios.post(
			SHOWTIME_API_BASE_URL + '/showtimes/' + showtimeId + '/seats/' + seatId
		);
	}

	createTicket(showtimeId) {
		return axios.post(SHOWTIME_API_BASE_URL + '/showtimes/' + showtimeId);
	}

	getTickets() {
		return axios.get(SHOWTIME_API_BASE_URL);
	}

	getTicketsByShowtime() {
		return axios.get(SHOWTIME_API_BASE_URL + '/showtimes/' + showtimeId);
	}
}

export default new TicketService();
