package springboot.restful.service.implement;

import java.util.Date;
import java.util.List;
import java.util.stream.Collectors;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import springboot.restful.exception.ResourceNotFoundException;
import springboot.restful.model.dto.MovieDTO;
import springboot.restful.model.entity.Genre;
import springboot.restful.model.entity.Movie;
import springboot.restful.repository.GenreRepository;
import springboot.restful.repository.MovieRepository;
import springboot.restful.service.MovieService;
import springboot.restful.util.ModelMapping;

@Service
public class MovieServiceImp implements MovieService, ModelMapping<Movie, MovieDTO> {

	@Autowired
	private MovieRepository movieRepository;
	
	@Autowired
	private GenreRepository genreRepository;

	@Autowired
	private ModelMapper modelMapper;

	@Override
	public MovieDTO createMovie(MovieDTO movieDTO) {

		Movie movie = dtoToEntity(movieDTO);
		
		movie.setDisplay(true);
		
		Date now = new Date();
		if (now.before(movieDTO.getReleases())) {
			System.out.println("comming soon");
			movie.setComming(true);
			movie.setShowing(false);
		} else {
			System.out.println("now showing");
			movie.setShowing(true);
			movie.setComming(false);
		}

		movieDTO.getGenres().stream().forEach(g -> {
			System.out.println("id = " + g.getId() + " ;name = " + g.getName());
			Genre genre = genreRepository.findById(g.getId())
					.orElseThrow(() -> new ResourceNotFoundException("Genre", "id", g.getId()));
			System.out.println(genre);
			movie.getGenres().add(genre);
		});


		return entityToDTO(movieRepository.save(movie));
	}

	@Override
	public MovieDTO getMovieById(Integer id) {

		Movie movie = movieRepository.findById(id).orElseThrow(() -> new ResourceNotFoundException("Movie", "id", id));

		return entityToDTO(movie);
	}

	@Override
	public List<MovieDTO> getAllMovie() {
		return movieRepository.findAll().stream().map(movie -> entityToDTO(movie)).collect(Collectors.toList());
	}

	@Override
	public MovieDTO updateMovie(Integer id, MovieDTO movieDTO) {

		Movie movie = movieRepository.findById(id).orElseThrow(() -> new ResourceNotFoundException("Movie", "id", id));

		movie.setDescription(movieDTO.getDescription());
		movie.setName(movieDTO.getName());
		movie.setDuration(movieDTO.getDuration());
		movie.setImage(movieDTO.getImage());
		movie.setTrailer(movieDTO.getTrailer());
		movie.setReleases(movieDTO.getReleases());
		movie.setShowing(movieDTO.isShowing());
		movie.setComming(movieDTO.isComming());
		movie.setDisplay(movieDTO.isDisplay());

		movie.getGenres().clear();

		movieDTO.getGenres().stream().forEach(g -> {
			Genre genre = genreRepository.findById(g.getId())
					.orElseThrow(() -> new ResourceNotFoundException("Genre", "id", g.getId()));
			movie.getGenres().add(genre);
		});

		if (movieDTO.isDisplay() == false) {
			movie.setShowing(false);
			movie.setComming(false);
		} else {
			Date now = new Date();
			if (now.before(movieDTO.getReleases())) {
				System.out.println("comming soon");
				movie.setComming(true);
				movie.setShowing(false);
			} else {
				System.out.println("now showing");
				movie.setShowing(true);
				movie.setComming(false);
			}
		}

		return entityToDTO(movieRepository.save(movie));
	}

	@Override
	public Movie dtoToEntity(MovieDTO dto) {
		return this.modelMapper.map(dto, Movie.class);
	}

	@Override
	public MovieDTO entityToDTO(Movie entity) {
		return this.modelMapper.map(entity, MovieDTO.class);
	}


}