const initialState = {
	movies: [],
	latestMovies: [],
	nowShowing: [],
	comingSoon: [],
	randomMovie: null,
	details: {},
	token: null,
	errorMsg: '',
};

const movieReducer = (state = initialState, action) => {
	switch (action.type) {
		case 'CREATE_MOVIE': {
			return {
				...state,
				token: action.payload,
			};
		}
		case 'SET_CREATE_MOVIE_MESSAGE': {
			return {
				...state,
				errorMsg: action.payload,
			};
		}
		case 'GET_ALL_MOVIE': {
			const latestMovies = action.payload
				.sort((a, b) => Date.parse(b.releases) - Date.parse(a.releases))
				.slice(0, 5);
			const nowShowing = action.payload.filter(
				(movie) => movie.showing === true && movie.coming === false
			);
			const comingSoon = action.payload.filter(
				(movie) => movie.coming === true && movie.showing === false
			);
			const randomMovie =
				action.payload[Math.floor(Math.random() * action.payload.length)];
			return {
				...state,
				movies: action.payload,
				randomMovie,
				latestMovies,
				nowShowing,
				comingSoon,
				errorMsg: action.payload,
			};
		}
		case 'GET_MOVIE_DETAIL': {
			return {
				...state,
				details: action.payload,
			};
		}
		default: {
			return {
				...state,
			};
		}
	}
};

export default movieReducer;
