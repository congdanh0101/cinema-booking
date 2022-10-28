import axios from 'axios';

const MOVIES_API_BASE_URL = 'http://localhost:8888/api/movies';

class MoviesService {
	createMovies() {
		return axios.post(MOVIES_API_BASE_URL);
	}

	getAllMovies() {
		return axios.get(MOVIES_API_BASE_URL);
	}

	getMoviesById(moviesId) {
		return axios.get(MOVIES_API_BASE_URL + '/' + moviesId);
	}

	updateMoviesById(moviesId) {
		return axios.put(MOVIES_API_BASE_URL + '/' + moviesId);
	}

	deleteMoviesById(moviesId) {
		return axios.delete(MOVIES_API_BASE_URL + '/' + moviesId);
	}
}

export default new MoviesService();
