import http from '../../shared/helpers/config';

export const getAllSeatsAvailableByShowtime = (showtimeId) => {
	return async (dispatch) => {
		try {
			const response = await http().get(
				`seats/available/showtimes/${showtimeId}`
			);
			dispatch({
				type: 'GET_ALL_SEAT_AVAILABLE_BY_SHOWTIME',
				payload: response.data,
				message: response.data.message,
			});
		} catch (err) {
			const { message } = err.response.data;
			dispatch({
				type: 'SET_SEAT_MESSAGE',
				payload: message,
			});
		}
	};
};

export const getAllSeatsOrderedByShowtime = (showtimeId) => {
	return async (dispatch) => {
		try {
			const response = await http().get(
				`seats/available/showtimes/${showtimeId}`
			);
			dispatch({
				type: 'GET_ALL_SEAT_ORDERED_BY_SHOWTIME',
				payload: response.data,
				message: response.data.message,
			});
		} catch (err) {
			const { message } = err.response.data;
			dispatch({
				type: 'SET_SEAT_MESSAGE',
				payload: message,
			});
		}
	};
};
