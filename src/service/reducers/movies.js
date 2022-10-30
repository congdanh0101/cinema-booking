import { GET_MOVIES, SELECT_MOVIE } from '../types';

const initialState = {
	movies: [],
	latestMovies: [],
	nowShowing: [],
	comingSoon: [],
	randomMovie: null,
	selectedMovie: null,
};

const getMovies = (state, payload) => {
	const latestMovies = payload
		.sort((a, b) => Date.parse(b.releases) - Date.parse(a.releases))
		.slice(0, 5);

	const nowShowing = payload.filter((movie) => movie.showing === true);

	const comingSoon = payload.filter(
		(movie) => new Date(movie.releases) > new Date()
	);

	return {
		...state,
		movies: state.movies.concat(payload),
		randomMovie: state.movies.concat(
			payload[Math.floor(Math.random() * payload.length)]
		),
		latestMovies,
		nowShowing,
		comingSoon,
	};
};

const onSelectMovie = (state, payload) => ({
	...state,
	selectedMovie: payload,
});

export default (state = initialState, action) => {
	const { type, payload } = action;

	switch (type) {
		case GET_MOVIES:
			return getMovies(state, payload);
		case SELECT_MOVIE:
			return onSelectMovie(state, payload);
		default:
			return state;
	}
};
