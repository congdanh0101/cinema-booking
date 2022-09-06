package springboot.restful.controller;

import java.util.List;

import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import springboot.restful.model.dto.MovieDTO;
import springboot.restful.service.MovieService;

@RestController
@RequestMapping("/api/movies")
public class MovieController {

	@Autowired
	private MovieService movieService;

	//create movie
	@PostMapping("")
	public ResponseEntity<?> createMovie(@Valid @RequestBody MovieDTO movieDTO) {

		return new ResponseEntity<MovieDTO>(movieService.createMovie(movieDTO), HttpStatus.CREATED);
	}

	
	//get all movies List<Movie>
	@GetMapping()
	public ResponseEntity<?> getAllMovies() {
		return new ResponseEntity<List<MovieDTO>>(movieService.getAllMovie(), HttpStatus.OK);
	}
	
	
	//get by id
	@GetMapping("/{id}")
	public ResponseEntity<?> getMovieById(@PathVariable int id) {
		return ResponseEntity.ok().body(movieService.getMovieById(id));
	}

	// update movie
	@PutMapping("/{id}")
	public ResponseEntity<?> updateMovie(@PathVariable int id, @Valid @RequestBody MovieDTO movieDTO) {
		return ResponseEntity.ok().body(movieService.updateMovie(id, movieDTO));
	}

}
