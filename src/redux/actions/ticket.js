import http from '../../shared/helpers/config';

export const getTickets = () => {
	return async (dispatch) => {
		try {
			const response = await http().get(`tickets`);
			dispatch({
				type: 'GET_ALL_TICKET',
				payload: response.data,
				message: response.data.message,
			});
		} catch (err) {
			const { message } = err.response.data;
			dispatch({
				type: 'SET_TICKET_MESSAGE',
				payload: message,
			});
		}
	};
};

export const getTicketsByShowtime = (showtimeId) => {
	return async (dispatch) => {
		try {
			const response = await http().get(`tickets/showtimes/${showtimeId}`);
			dispatch({
				type: 'GET_TICKET_BY_SHOWTIME',
				payload: response.data,
				message: response.data.message,
			});
		} catch (err) {
			const { message } = err.response.data;
			dispatch({
				type: 'SET_TICKET_MESSAGE',
				payload: message,
			});
		}
	};
};

export const addTicket = (showtimeId, seatId, seat, showtime) => {
	return async (dispatch) => {
		try {
			dispatch({
				type: 'SET_MOVIE_MESSAGE',
				payload: '',
				message: '',
			});
			const token = localStorage.getItem('jwtToken');
			const response = await http(token).post(
				`tickets/showtimes/${showtimeId}/seats/${seatId}`,
				{
					seat,
					showtime,
				}
			);
			dispatch({
				type: 'ADD_SHOWTIME',
				payload: response.data,
				message: response.data.message,
			});
		} catch (err) {
			const { message } = err.response.data;
			dispatch({
				type: 'SET_MOVIE_MESSAGE',
				payload: message,
			});
		}
	};
};

export const addManyTickets = (showtimeId) => {
	return async (dispatch) => {
		try {
			const token = localStorage.getItem('jwtToken');
			const response = await http(token).post(
				`tickets/showtimes/${showtimeId}`
			);
			dispatch({
				type: 'ADD_MANY_TICKETS',
				payload: response.data,
				message: response.data.message,
			});
		} catch (err) {
			const { message } = err.response.data;
			dispatch({
				type: 'SET_TICKET_MESSAGE',
				payload: message,
			});
		}
	};
};
