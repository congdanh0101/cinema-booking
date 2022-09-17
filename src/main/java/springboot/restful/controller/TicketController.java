package springboot.restful.controller;

import java.util.List;

import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import springboot.restful.model.dto.TicketDTO;
import springboot.restful.service.TicketService;

@RestController
@RequestMapping("/api/tickets")
public class TicketController {

	@Autowired
	private TicketService ticketService;

	@PostMapping("/showtimes/{idShowTime}/seats/{idSeat}")
	public ResponseEntity<TicketDTO> createTicket(@PathVariable(value = "idShowTime") int idShowTime,
			@PathVariable(value = "idSeat") int idSeat, @Valid @RequestBody TicketDTO ticketDTO) {
		TicketDTO ticket = ticketService.createTicket(idShowTime, idSeat, ticketDTO);
		ticket.getShowTime().getShowDate().setDate((ticket.getShowTime().getShowDate().getDate() + 1));
		return new ResponseEntity<TicketDTO>(ticket,
				HttpStatus.CREATED);
	}

	@GetMapping("")
	public ResponseEntity<?> getAllTickets() {
		return new ResponseEntity<List<TicketDTO>>(ticketService.getAllTickets(), HttpStatus.OK);
	}
}
