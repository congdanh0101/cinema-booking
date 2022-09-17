package springboot.restful.service;

import java.util.List;

import springboot.restful.model.dto.TheaterDTO;
import springboot.restful.model.entity.Theater;

public interface TheaterService {

	// create
	TheaterDTO createTheater(TheaterDTO theaterDTO);

	// get
	TheaterDTO geTheaterById(int id);

	List<TheaterDTO> getAllTheaters();

	//update
	TheaterDTO updateTheater(int id,TheaterDTO theaterDTO);

}
