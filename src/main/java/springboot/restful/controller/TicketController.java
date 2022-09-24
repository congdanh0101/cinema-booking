package springboot.restful.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import springboot.restful.exception.ApiRespone;
import springboot.restful.model.dto.TicketDTO;
import springboot.restful.service.TicketService;

import javax.validation.Valid;
import java.util.Date;
import java.util.List;

@RestController
@RequestMapping("/api/tickets")
public class TicketController {

    @Autowired
    private TicketService ticketService;

    @PostMapping("/showtimes/{idShowTime}/seats/{idSeat}")
    public ResponseEntity<TicketDTO> createTicket(@PathVariable(value = "idShowTime") int idShowTime,
                                                  @PathVariable(value = "idSeat") int idSeat, @Valid @RequestBody TicketDTO ticketDTO) {
        TicketDTO ticket = ticketService.createTicket(idShowTime, idSeat, ticketDTO);
        return new ResponseEntity<TicketDTO>(ticket,
                HttpStatus.CREATED);
    }

    @GetMapping("")
    public ResponseEntity<?> getAllTickets() {
        return new ResponseEntity<List<TicketDTO>>(ticketService.getAllTickets(), HttpStatus.OK);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteTicket(@PathVariable int id) {
        ticketService.deleteTicket(id);
        return new ResponseEntity<ApiRespone>(new ApiRespone(new Date().toLocaleString(), "Ticket was deleted with id: " + id, true), HttpStatus.OK);
    }

    @GetMapping("/{id}")
    public ResponseEntity<?> getTicketById(@PathVariable int id) {
        return new ResponseEntity<TicketDTO>(ticketService.getTicketById(id), HttpStatus.OK);
    }
}
