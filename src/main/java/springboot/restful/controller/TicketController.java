package springboot.restful.controller;

import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import springboot.restful.model.dto.TicketDTO;
import springboot.restful.service.TicketService;

@RestController
@RequestMapping("/api/ticket")
public class TicketController {

	@Autowired
	private TicketService ticketService;

	@PostMapping("/showtime/{idShowTime}/seat/{idSeat}")
	public ResponseEntity<?> createTicket(@PathVariable(value = "idShowTime") int idShowTime,
			@PathVariable(value = "idSeat") int idSeat, @Valid @RequestBody TicketDTO ticketDTO) {
		return new ResponseEntity<TicketDTO>(ticketService.createTicket(idShowTime, idSeat, ticketDTO),
				HttpStatus.CREATED);
	}
}
