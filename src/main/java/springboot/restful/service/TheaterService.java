package springboot.restful.service;

import java.util.List;

import springboot.restful.model.dto.TheaterDTO;

public interface TheaterService {

	// create

	// get
	TheaterDTO geTheaterById(int id);

	List<TheaterDTO> getAllTheaters();

}
