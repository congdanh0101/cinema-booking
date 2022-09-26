package springboot.restful.service.implement;

import lombok.extern.slf4j.Slf4j;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import springboot.restful.exception.ApiException;
import springboot.restful.exception.ResourceNotFoundException;
import springboot.restful.model.entity.Seat;
import springboot.restful.model.entity.ShowTime;
import springboot.restful.model.entity.Ticket;
import springboot.restful.model.payloads.TicketDTO;
import springboot.restful.repository.TicketRepository;
import springboot.restful.service.SeatService;
import springboot.restful.service.ShowTimeService;
import springboot.restful.service.TicketService;
import springboot.restful.util.ModelMapping;

import java.util.List;
import java.util.stream.Collectors;

@Service
@Slf4j
public class TicketServiceImp implements TicketService, ModelMapping<Ticket, TicketDTO> {

    @Autowired
    private ModelMapper modelMapper;
    @Autowired
    private TicketRepository ticketRepository;

    @Autowired
    private SeatService seatService;

    @Autowired
    private ShowTimeService showTimeService;

    @Override
    public TicketDTO createTicket(int idShowTime, int idSeat, TicketDTO ticketDTO) {

        ShowTime showTime = modelMapper.map(showTimeService.getShowTimeById(idShowTime), ShowTime.class);

        Seat seat = modelMapper.map(seatService.getSeatById(idSeat), Seat.class);

        Ticket ticket = dtoToEntity(ticketDTO);

        if (isSeatAvailable(getAllTicketsByShowTime(idShowTime), seat))
            ticket.setSeat(seat);
        else
            throw new ApiException("Not avalable");


        ticket.setShowTime(showTime);
        ticket.setPrice(showTime.getPrice());
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

    private boolean isSeatAvailable(List<TicketDTO> listTicketDTOs, Seat seat) {

        List<Ticket> listTickets = listTicketDTOs.stream().map(this::dtoToEntity)
                .filter(t -> t.getSeat().equals(seat)).collect(Collectors.toList());
        return listTickets == null || listTickets.size() == 0 || listTickets.isEmpty();

    }

    @Override
    public List<TicketDTO> getAllTicketsByShowTime(int idShowTime) {

        ShowTime showTime = modelMapper.map(showTimeService.getShowTimeById(idShowTime), ShowTime.class);

        List<Ticket> tickets = ticketRepository.findByShowTime(showTime);

        return tickets.stream().map(this::entityToDTO).collect(Collectors.toList());
    }

    @Override
    public List<TicketDTO> getAllTickets() {
        return ticketRepository.findAll().stream().map(this::entityToDTO).collect(Collectors.toList());
    }

    @Override
    public TicketDTO getTicketById(int id) {
        Ticket ticket = ticketRepository.findById(id).orElseThrow(() -> new ResourceNotFoundException("Ticket", "id", id));
        return entityToDTO(ticket);
    }

    @Override
    public void deleteTicket(int id) {
        Ticket ticket = ticketRepository.findById(id).orElseThrow(() -> new ResourceNotFoundException("Ticket", "id", id));
        ticketRepository.delete(ticket);
    }

}
