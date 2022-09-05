package springboot.restful.controller;

import java.util.List;

import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
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

	@PostMapping("")
	public ResponseEntity<?> createMovie(@Valid @RequestBody MovieDTO movieDTO) {

		return new ResponseEntity<MovieDTO>(movieService.createMovie(movieDTO), HttpStatus.CREATED);
	}

	@GetMapping()
	public ResponseEntity<?> getAllMovies() {
		return new ResponseEntity<List<MovieDTO>>(movieService.getAllMovie(), HttpStatus.OK);
	}
}
