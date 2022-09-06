package springboot.restful.service;

import java.util.List;

import springboot.restful.model.dto.MovieDTO;

public interface MovieService {

	// create
	MovieDTO createMovie(MovieDTO movieDTO);

	// get
	MovieDTO getMovieById(Integer id);

	List<MovieDTO> getAllMovie();

	// update
	MovieDTO updateMovie(Integer id, MovieDTO movieDTO);

}
