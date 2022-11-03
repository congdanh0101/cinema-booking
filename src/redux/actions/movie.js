import http from '../../shared/helpers/config';

export const getAllMovie = () => {
	return async (dispatch) => {
		try {
			const response = await http().get(`movies`);
			dispatch({
				type: 'GET_ALL_MOVIE',
				payload: response.data.content,
				message: response.data.message,
			});
		} catch (err) {
			const { message } = err.response.data.content;
			dispatch({
				type: 'SET_MOVIE_MESSAGE',
				payload: message,
			});
		}
	};
};

export const getMovieByDisplay = () => {
	return async (dispatch) => {
		try {
			const response = await http().get(`movies/display=true`);
			dispatch({
				type: 'GET_MOVIE_BY_DISPLAY',
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

export const getMovieByShowing = () => {
	return async (dispatch) => {
		try {
			const response = await http().get(`movies/showing=true`);
			dispatch({
				type: 'GET_MOVIE_BY_SHOWING',
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

export const getMovieByComing = () => {
	return async (dispatch) => {
		try {
			const response = await http().get(`movies/coming=true`);
			dispatch({
				type: 'GET_MOVIE_BY_COMING',
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

export const getMovieDetail = (id) => {
	return async (dispatch) => {
		try {
			const response = await http().get(`movies/${id}`);
			dispatch({
				type: 'GET_MOVIE_DETAIL',
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

export const addMovie = (
	name,
	duration,
	description,
	image,
	trailer,
	releases,
	genres,
	display,
	showing,
	coming
) => {
	return async (dispatch) => {
		try {
			const token = localStorage.getItem('jwtToken');
			const response = await http(token).post(`movies`, {
				name,
				duration,
				description,
				image,
				trailer,
				releases,
				genres,
				display,
				showing,
				coming,
			});
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

export const updateMovie = (
	movieId,
	name,
	duration,
	description,
	image,
	trailer,
	releases,
	genres,
	display,
	showing,
	coming
) => {
	return async (dispatch) => {
		try {
			const token = localStorage.getItem('jwtToken');
			const response = await http(token).put(`movies/${movieId}`, {
				name,
				duration,
				description,
				image,
				trailer,
				releases,
				genres,
				display,
				showing,
				coming,
			});
			dispatch({
				type: 'UPDATE_MOVIE',
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

export const deleteMovie = (movieId) => {
	return async (dispatch) => {
		try {
			const token = localStorage.getItem('jwtToken');
			const response = await http(token).delete(`movies/${movieId}`);
			dispatch({
				type: 'DELETE_MOVIE',
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
