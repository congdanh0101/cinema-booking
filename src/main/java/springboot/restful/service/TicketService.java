package springboot.restful.service;

import springboot.restful.model.dto.TicketDTO;

public interface TicketService {

	// create
	TicketDTO createTicket(int idShowTime, int idSeat, TicketDTO ticketDTO);

}
