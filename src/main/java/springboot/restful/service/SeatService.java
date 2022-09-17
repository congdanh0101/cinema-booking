package springboot.restful.service;

import springboot.restful.model.dto.SeatDTO;

import java.util.List;

public interface SeatService {

	// create
//	SeatDTO createSeat(SeatDTO seatDTO);

	// get
	SeatDTO getSeatById(int id);

	List<SeatDTO> getAllSeats();


}
