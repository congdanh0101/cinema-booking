package springboot.restful.service.implement;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import springboot.restful.exception.ResourceNotFoundException;
import springboot.restful.model.dto.SeatDTO;
import springboot.restful.model.entity.Seat;
import springboot.restful.repository.SeatRepository;
import springboot.restful.service.SeatService;
import springboot.restful.util.ModelMapping;

@Service
public class SeatServiceImp implements SeatService, ModelMapping<Seat, SeatDTO> {

	@Autowired
	private ModelMapper modelMapper;

	@Autowired
	private SeatRepository seatRepository;

	@Override
	public SeatDTO getSeatById(int id) {
		Seat seat = seatRepository.findById(id).orElseThrow(() -> new ResourceNotFoundException("Seat", "id", id));
		return entityToDTO(seat);
	}

	@Override
	public Seat dtoToEntity(SeatDTO dto) {
		return this.modelMapper.map(dto, Seat.class);
	}

	@Override
	public SeatDTO entityToDTO(Seat entity) {
		return this.modelMapper.map(entity, SeatDTO.class);
	}

}