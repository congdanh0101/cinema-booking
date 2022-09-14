package springboot.restful.service.implement;

import java.util.Date;
import java.util.List;
import java.util.stream.Collectors;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import lombok.extern.slf4j.Slf4j;
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
@Slf4j
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

//		if (!isShowTimeAvailable(getAllShowTimeByShowDateAndTheater(showTimeDTO.getShowDate(), idTheater),
//				showTimeDTO.getTimeStart(), movie))
//			throw new ApiException("Can not create new show time");

		showTime.setPrice(getPrice(showTimeDTO.getShowDate(), showTimeDTO.getTimeStart()));
		showTime.setTimeEnd(getTimeEnd(showTimeDTO.getTimeStart(), movie.getDuration()));
		showTime.setTheater(theater);
		showTime.setMovie(movie);

		return entityToDTO(showTimeRepository.save(showTime));
	}

	@SuppressWarnings("deprecation")
	private Date getTimeEnd(Date timeStart, int duration) {

//		timeStart.setDate(new Date().getDate());
//		timeStart.setMonth(new Date().getMonth());
//		timeStart.setYear(new Date().getYear());
//		timeStart.setHours(timeStart.getHours() - 1);

		Date timeEnd = new Date();
		int newDuration = duration + 30;
		int hour = newDuration / 60;
		int minute = newDuration % 60;

		timeEnd.setHours(timeStart.getHours() + hour - 1);
		timeEnd.setMinutes(timeStart.getMinutes() + minute);
		timeEnd.setSeconds(0);
		System.out.println("Time end: " + timeEnd);
		return timeEnd;
	}

	@Override
	public List<ShowTimeDTO> getAllShowTime() {

		return showTimeRepository.findAll().stream().map(st -> entityToDTO(st)).collect(Collectors.toList());
	}

	private int getPrice(Date showDate, Date showTime) {

//		LocalDate today = LocalDate.now();

		Date start = new Date();
		Date stop = new Date();
		Date now = new Date();

		if (showTime.getHours() < 8) {
			now.setDate(showDate.getDate() + 1);
		} else {
			now.setDate(showDate.getDate());
		}
		now.setHours(showTime.getHours() - 8);
		now.setMinutes(showTime.getMinutes());
		now.setSeconds(showTime.getSeconds());
		now.setMonth(showDate.getMonth());
		now.setYear(showDate.getYear());

		if (now.toString().contains("Fri") || now.toString().contains("Sat") || now.toString().contains("Sun")) {

			// price 20 from 8am -> 17pm

			morningShift(start, stop);
			if (isBetweenTwosTimes(start, stop, now))
				return 20;

			// price 25 from 17pm -> 22pm

			eveningShift(start, stop);
			if (isBetweenTwosTimes(start, stop, now))
				return 25;

			// price 15 after 22pm
			nightShift(start, stop);
			if (isBetweenTwosTimes(start, stop, now))
				return 15;

		} else if (now.toString().contains("Tue")) {

			// price 10 all day
			return 10;

		} else {

			// price 15 from 8am -> 17pm
			morningShift(start, stop);
			if (isBetweenTwosTimes(start, stop, now))
				return 15;

			// price 20 from 17pm -> 22pm
			eveningShift(start, stop);
			if (isBetweenTwosTimes(start, stop, now))
				return 20;

			// price 10 after 22pm
			nightShift(start, stop);

			if (isBetweenTwosTimes(start, stop, now))
				return 10;
		}
		return 0;
	}

	private boolean isBetweenTwosTimes(Date start, Date stop, Date now) {
		return (now.getHours() >= start.getHours() && now.getHours() < stop.getHours());
	}

	private void morningShift(Date start, Date stop) {
		start.setHours(0);
		start.setMinutes(0);
		start.setSeconds(0);
		stop.setHours(17);
		stop.setMinutes(0);
		stop.setSeconds(0);
	}

	private void eveningShift(Date start, Date stop) {
		start.setHours(17);
		start.setMinutes(0);
		start.setSeconds(0);
		stop.setHours(22);
		stop.setMinutes(0);
		stop.setSeconds(0);
	}

	private void nightShift(Date start, Date stop) {
		start.setHours(22);
		start.setMinutes(0);
		start.setSeconds(0);
		stop.setHours(23);
		stop.setMinutes(59);
		stop.setSeconds(59);
	}

	private boolean isShowTimeAvailable(List<ShowTimeDTO> showTimeDTOs, Date timeStart, Movie movie) {

		if (showTimeDTOs.size() == 0 || showTimeDTOs == null || showTimeDTOs.isEmpty())
			return true;



		return false;
	}

	@Override
	public List<ShowTimeDTO> getAllShowTimeByShowDate(Date showDate) {

		List<ShowTime> showTimes = showTimeRepository.findByShowDate(showDate);
		List<ShowTimeDTO> showTimeDTOs = showTimes.stream().map(st -> entityToDTO(st)).collect(Collectors.toList());
		return showTimeDTOs;
	}

	@Override
	public List<ShowTimeDTO> getAllShowTimeByShowDateAndTheater(Date showDate, int idTheater) {

		Theater theater = modelMapper.map(theaterService.geTheaterById(idTheater), Theater.class);
		List<ShowTime> showTimes = showTimeRepository.findByShowDateAndTheaterOrderByTimeEndAsc(showDate, theater);
		List<ShowTimeDTO> showTimeDTOs = showTimes.stream().map(st -> entityToDTO(st)).collect(Collectors.toList());
		return showTimeDTOs;
	}

}
