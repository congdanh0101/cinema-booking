package springboot.restful.service.implement;

import java.util.Date;
import java.util.List;
import java.util.stream.Collectors;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import springboot.restful.exception.ResourceNotFoundException;
import springboot.restful.model.dto.ShowTimeDTO;
import springboot.restful.model.entity.Movie;
import springboot.restful.model.entity.ShowTime;
import springboot.restful.model.entity.Theater;
import springboot.restful.repository.ShowTimeRepository;
import springboot.restful.service.MovieService;
import springboot.restful.service.ShowTimeService;
import springboot.restful.service.TheaterService;
import springboot.restful.util.ModelMapping;

@Service
public class ShowTimeServiceImp implements ShowTimeService, ModelMapping<ShowTime, ShowTimeDTO> {

	@Autowired
	private ModelMapper modelMapper;

	@Autowired
	private ShowTimeRepository showTimeRepository;

	@Autowired
	private MovieService movieService;

	@Autowired
	private TheaterService theaterService;

	@Override
	public ShowTimeDTO getShowTimeById(int id) {

		ShowTime showTime = showTimeRepository.findById(id)
				.orElseThrow(() -> new ResourceNotFoundException("ShowTime", "id", id));

		isShowTimeAvailable(showTime);

		return entityToDTO(showTime);
	}

	@Override
	public ShowTime dtoToEntity(ShowTimeDTO dto) {
		return this.modelMapper.map(dto, ShowTime.class);
	}

	@Override
	public ShowTimeDTO entityToDTO(ShowTime entity) {
		return this.modelMapper.map(entity, ShowTimeDTO.class);
	}

	@Override
	public ShowTimeDTO createShowTime(ShowTimeDTO showTimeDTO, int idMovie, int idTheater) {

		Movie movie = modelMapper.map(movieService.getMovieById(idMovie), Movie.class);

		Theater theater = modelMapper.map(theaterService.geTheaterById(idTheater), Theater.class);

		ShowTime showTime = dtoToEntity(showTimeDTO);

		showTime.setMovie(movie);
		showTime.setTheater(theater);

		return null;
	}

	private boolean isShowTimeAvailable(ShowTime show) {

		int durationHour = show.getMovie().getDuration() / 60;
		int durationMinute = show.getMovie().getDuration() % 60;

		Date showDate = show.getShowDate();
		Date showTime = show.getShowTime();

		System.out.println(showDate);
		System.out.println(showTime);

		return false;
	}

	@Override
	public List<ShowTimeDTO> getAllShowTime() {

		return showTimeRepository.findAll().stream().map(st -> entityToDTO(st)).collect(Collectors.toList());
	}

}
