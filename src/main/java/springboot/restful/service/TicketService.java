package springboot.restful.service;

import springboot.restful.model.payloads.TicketDTO;

import java.util.List;

public interface TicketService {

    // create
    TicketDTO createTicket(int idShowTime, int idSeat, TicketDTO ticketDTO);

    // get
    List<TicketDTO> getAllTicketsByShowTime(int idShowTime);

    List<TicketDTO> getAllTickets();

    TicketDTO getTicketById(int id);

    //delete
    void deleteTicket(int id);

}
