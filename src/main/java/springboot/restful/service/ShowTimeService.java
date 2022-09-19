package springboot.restful.service;

import springboot.restful.model.dto.ShowTimeDTO;

import java.util.Date;
import java.util.List;

public interface ShowTimeService {

	// create
	ShowTimeDTO createShowTime(ShowTimeDTO showTimeDTO, int idMovie, int idTheater);

	// get
	ShowTimeDTO getShowTimeById(int id);

	List<ShowTimeDTO> getAllShowTime();

	List<ShowTimeDTO> getAllShowTimeByShowDate(Date showDate);

	List<ShowTimeDTO> getAllShowTimeByShowDateAndTheater(Date showDate, int idTheater);

	//update
	ShowTimeDTO updateShowTime(ShowTimeDTO showTimeDTO, int idMovie, int idTheater, int idShowTime);

	//delete
	void deleteShowTime(int id);

	void deleteShowTimeForce(int id);

}
