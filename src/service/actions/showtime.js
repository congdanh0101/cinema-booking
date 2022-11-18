import axiosClient from '../../shared/apis/axiosClient';

export const toggleDialog = () => ({ type: 'TOGGLE_DIALOG' });

export const selectShowtime = (showtime) => ({
	type: 'SELECT_SHOWTIMES',
	payload: showtime,
});

export const selectAllShowtimes = () => ({ type: 'SELECT_ALL_SHOWTIMES' });

export const getAllShowtime = () => {
	return async (dispatch) => {
		try {
			const response = await axiosClient().get(`showtimes`);
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
			const response = await axiosClient().get(`showtimes/${id}`);
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

export const getShowtimeByTheater = (id) => {
	return async (dispatch) => {
		try {
			const response = await axiosClient().get(`showtimes/theaters/${id}`);
			dispatch({
				type: 'GET_SHOWTIME_BY_THEATER',
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
			const token = localStorage.getItem('token');
			const response = await axiosClient(token).post(
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
			const token = localStorage.getItem('token');
			const response = await axiosClient(token).put(
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
			const response = await axiosClient().delete(`showtimes/${id}`);
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
			const response = await axiosClient().delete(`showtimes/${id}`);
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
