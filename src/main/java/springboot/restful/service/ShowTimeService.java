package springboot.restful.service;

import java.util.Date;
import java.util.List;

import springboot.restful.model.dto.ShowTimeDTO;

public interface ShowTimeService {

	// create
	ShowTimeDTO createShowTime(ShowTimeDTO showTimeDTO, int idMovie, int idTheater);

	// get
	ShowTimeDTO getShowTimeById(int id);

	List<ShowTimeDTO> getAllShowTime();

	List<ShowTimeDTO> getAllShowTimeByShowDate(Date showDate);

	List<ShowTimeDTO> getAllShowTimeByShowDateAndTheater(Date showDate, int idTheater);
}
