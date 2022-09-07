package springboot.restful.service.implement;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import springboot.restful.exception.ResourceNotFoundException;
import springboot.restful.model.dto.TicketDTO;
import springboot.restful.model.entity.Seat;
import springboot.restful.model.entity.ShowTime;
import springboot.restful.model.entity.Ticket;
import springboot.restful.repository.SeatRepository;
import springboot.restful.repository.ShowTimeRepository;
import springboot.restful.repository.TicketRepository;
import springboot.restful.service.TicketService;
import springboot.restful.util.ModelMapping;

@Service
public class TicketServiceImp implements TicketService, ModelMapping<Ticket, TicketDTO> {

	@Autowired
	private ModelMapper modelMapper;
	@Autowired
	private TicketRepository ticketRepository;
	@Autowired
	private SeatRepository seatRepository;
	@Autowired
	private ShowTimeRepository showTimeRepository;

	@Override
	public TicketDTO createTicket(int idShowTime, int idSeat, TicketDTO ticketDTO) {

		ShowTime showTime = showTimeRepository.findById(idShowTime)
				.orElseThrow(() -> new ResourceNotFoundException("ShowTime", "id", idShowTime));
		Seat seat = seatRepository.findById(idSeat)
				.orElseThrow(() -> new ResourceNotFoundException("Seat", "id", idSeat));

		Ticket ticket = dtoToEntity(ticketDTO);

		ticket.setSeat(seat);
		ticket.setShowTime(showTime);

		return entityToDTO(ticketRepository.save(ticket));

	}

	@Override
	public Ticket dtoToEntity(TicketDTO dto) {
		return this.modelMapper.map(dto, Ticket.class);
	}

	@Override
	public TicketDTO entityToDTO(Ticket entity) {
		return this.modelMapper.map(entity, TicketDTO.class);
	}
}
