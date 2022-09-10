package springboot.restful.service;

import java.util.List;

import springboot.restful.model.dto.ShowTimeDTO;

public interface ShowTimeService {

	// create
	ShowTimeDTO createShowTime(ShowTimeDTO showTimeDTO, int idMovie, int idTheater);

	// get
	ShowTimeDTO getShowTimeById(int id);

	List<ShowTimeDTO> getAllShowTime();
}
