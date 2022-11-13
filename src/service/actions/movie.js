import axiosClient from '../../shared/apis/axiosClient';

export const onSelectMovie = (movie) => ({
	type: 'SELECT_MOVIE',
	payload: movie,
});

export const getAllMovie = () => {
	return async (dispatch) => {
		try {
			const response = await axiosClient().get(`movies`);
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
			const response = await axiosClient().get(`movies/display=true`);
			dispatch({
				type: 'GET_MOVIE_BY_DISPLAY',
				payload: response.data,
				message: response.data.message,
			});
		} catch (err) {
			dispatch({
				type: 'SET_MOVIE_MESSAGE',
				payload: err,
			});
		}
	};
};

export const getMovieByShowing = () => {
	return async (dispatch) => {
		try {
			const response = await axiosClient().get(`movies/showing=true`);
			dispatch({
				type: 'GET_MOVIE_BY_SHOWING',
				payload: response.data,
				message: response.data.message,
			});
		} catch (err) {
			dispatch({
				type: 'SET_MOVIE_MESSAGE',
				payload: err,
			});
		}
	};
};

export const getMovieByComing = () => {
	return async (dispatch) => {
		try {
			const response = await axiosClient().get(`movies/coming=true`);
			dispatch({
				type: 'GET_MOVIE_BY_COMING',
				payload: response.data,
				message: response.data.message,
			});
		} catch (err) {
			dispatch({
				type: 'SET_MOVIE_MESSAGE',
				payload: err,
			});
		}
	};
};

export const getMovieDetail = (id) => {
	return async (dispatch) => {
		try {
			const response = await axiosClient().get(`movies/${id}`);
			dispatch({
				type: 'GET_MOVIE_DETAIL',
				payload: response.data,
				message: response.data.message,
			});
		} catch (err) {
			dispatch({
				type: 'SET_MOVIE_MESSAGE',
				payload: err,
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
			const response = await axiosClient(token).post(`movies`, {
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
			dispatch({
				type: 'SET_MOVIE_MESSAGE',
				payload: err,
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
			const response = await axiosClient(token).put(`movies/${movieId}`, {
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
			dispatch({
				type: 'SET_MOVIE_MESSAGE',
				payload: err,
			});
		}
	};
};

export const deleteMovie = (movieId) => {
	return async (dispatch) => {
		try {
			const token = localStorage.getItem('jwtToken');
			const response = await axiosClient(token).delete(`movies/${movieId}`);
			dispatch({
				type: 'DELETE_MOVIE',
				payload: response.data,
				message: response.data.message,
			});
		} catch (err) {
			dispatch({
				type: 'SET_MOVIE_MESSAGE',
				payload: err,
			});
		}
	};
};
