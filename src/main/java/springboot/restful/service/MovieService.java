package springboot.restful.service;

import springboot.restful.model.payloads.MovieDTO;

import java.util.List;

public interface MovieService {

    // create
    MovieDTO createMovie(MovieDTO movieDTO);

    // get
    MovieDTO getMovieById(Integer id);

    List<MovieDTO> getAllMovie();

    // update
    MovieDTO updateMovie(Integer id, MovieDTO movieDTO);

    // delete
    void deleteMovie(Integer id);

}
