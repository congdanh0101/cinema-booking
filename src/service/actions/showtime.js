import http from '../../shared/helpers/config';

export const getAllShowtime = () => {
	return async (dispatch) => {
		try {
			const response = await http().get(`showtimes`);
			dispatch({
				type: 'GET_ALL_SHOWTIME',
				payload: response.data,
			});
		} catch (err) {
			dispatch({
				type: 'SET_SHOWTIME_MESSAGE',
				payload: err,
			});
		}
	};
};

export const getShowtimeDetail = (id) => {
	return async (dispatch) => {
		try {
			const response = await http().get(`showtimes/${id}`);
			dispatch({
				type: 'GET_SHOWTIME_DETAIL',
				payload: response.data,
			});
		} catch (err) {
			dispatch({
				type: 'SET_SHOWTIME_MESSAGE',
				payload: err,
			});
		}
	};
};

export const addShowtime = (movieId, theaterId) => {
	return async (dispatch) => {
		try {
			const token = localStorage.getItem('jwtToken');
			const response = await http(token).post(
				`showtimes/movies/${movieId}/theaters/${theaterId}`,
				{
					movieId,
					theaterId,
				}
			);
			dispatch({
				type: 'ADD_SHOWTIME',
				payload: response.data,
				message: response.data.message,
			});
		} catch (err) {
			dispatch({
				type: 'SET_SHOWTIME_MESSAGE',
				payload: err,
			});
		}
	};
};

export const updateShowtime = (movieId, theaterId) => {
	return async (dispatch) => {
		try {
			const token = localStorage.getItem('jwtToken');
			const response = await http(token).put(
				`showtimes/movies/${movieId}/theaters/${theaterId}`,
				{
					movieId,
					theaterId,
				}
			);
			dispatch({
				type: 'UPDATE_SHOWTIME',
				payload: response.data,
				message: response.data.message,
			});
		} catch (err) {
			dispatch({
				type: 'SET_SHOWTIME_MESSAGE',
				payload: err,
			});
		}
	};
};

export const deleteShowtime = (id) => {
	return async (dispatch) => {
		try {
			const response = await http().delete(`showtimes/${id}`);
			dispatch({
				type: 'DELETE_SHOWTIME',
				payload: response.data,
				message: response.data.message,
			});
		} catch (err) {
			dispatch({
				type: 'SET_SHOWTIME_MESSAGE',
				payload: err,
			});
		}
	};
};

export const deleteShowtimeForce = (id) => {
	return async (dispatch) => {
		try {
			const response = await http().delete(`showtimes/${id}`);
			dispatch({
				type: 'DELETE_SHOWTIME_FORCE',
				payload: response.data,
				message: response.data.message,
			});
		} catch (err) {
			dispatch({
				type: 'SET_SHOWTIME_MESSAGE',
				payload: err,
			});
		}
	};
};