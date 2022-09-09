package springboot.restful.service.implement;

import java.time.LocalDate;
import java.util.Date;
import java.util.List;
import java.util.stream.Collectors;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import springboot.restful.exception.ApiException;
import springboot.restful.model.dto.TicketDTO;
import springboot.restful.model.entity.Seat;
import springboot.restful.model.entity.ShowTime;
import springboot.restful.model.entity.Ticket;
import springboot.restful.repository.TicketRepository;
import springboot.restful.service.SeatService;
import springboot.restful.service.ShowTimeService;
import springboot.restful.service.TicketService;
import springboot.restful.util.ModelMapping;

@Service
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
		ticket.setPrice(getPrice(showTime.getShowDate(), showTime.getShowTime()));
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

	private int getPrice(Date showDate, Date showTime) {

		LocalDate today = LocalDate.now();
		Date start = new Date();
		Date stop = new Date();
		Date now = new Date();
		now.setDate(showDate.getDate());
		now.setMonth(showDate.getMonth());
		now.setYear(showDate.getYear());
		now.setHours(showTime.getHours());
		now.setMinutes(showTime.getMinutes());
		now.setSeconds(showTime.getSeconds());

		System.out.println("now " + now);
		System.out.println("start " + start);
		System.out.println("stop " + stop);

		System.out.println(now.toString().substring(0, 3));

		if (now.toString().contains("Fri") || now.toString().contains("Sat") || now.toString().contains("Sun")) {

			// price 20 from 8am -> 17pm

			morningShift(start, stop);
			if (isBetweenTwosTimes(start, stop, now))
				return 20;

			// price 25 from 17pm -> 22pm

			eveningShift(start, stop);
			if (isBetweenTwosTimes(start, stop, now))
				return 25;

			// price 15 after 22pm
			nightShift(start, stop);
			if (isBetweenTwosTimes(start, stop, now))
				return 15;

		} else if (now.toString().contains("Tue")) {

			// price 10 all day
			return 10;

		} else {

			// price 15 from 8am -> 17pm
			morningShift(start, stop);
			if (isBetweenTwosTimes(start, stop, now))
				return 15;

			// price 20 from 17pm -> 22pm
			eveningShift(start, stop);
			if (isBetweenTwosTimes(start, stop, now))
				return 20;

			// price 10 after 22pm
			nightShift(start, stop);
			if (isBetweenTwosTimes(start, stop, now))
				return 10;
		}
		return 0;
	}

	private boolean isBetweenTwosTimes(Date start, Date stop, Date now) {

		if (now.getHours() > start.getHours() && now.getHours() < stop.getHours())
			return true;
		return false;
	}

	private void morningShift(Date start, Date stop) {
		start.setHours(0);
		start.setMinutes(0);
		start.setSeconds(0);
		stop.setHours(17);
		stop.setMinutes(0);
		stop.setSeconds(0);
	}

	private void eveningShift(Date start, Date stop) {
		start.setHours(17);
		start.setMinutes(0);
		start.setSeconds(0);
		stop.setHours(22);
		stop.setMinutes(0);
		stop.setSeconds(0);
	}

	private void nightShift(Date start, Date stop) {
		start.setHours(22);
		start.setMinutes(0);
		start.setSeconds(0);
		stop.setHours(23);
		stop.setMinutes(59);
		stop.setSeconds(59);
	}

	private boolean isSeatAvailable(List<TicketDTO> listTicketDTOs, Seat seat) {

		List<Ticket> listTickets = listTicketDTOs.stream().map(t -> dtoToEntity(t))
				.filter(t -> t.getSeat().equals(seat)).collect(Collectors.toList());
		return (listTickets == null || listTickets.size() == 0 || listTickets.isEmpty());

	}

	@Override
	public List<TicketDTO> getAllTicketsByShowTime(int idShowTime) {

		ShowTime showTime = modelMapper.map(showTimeService.getShowTimeById(idShowTime), ShowTime.class);

		List<Ticket> tickets = ticketRepository.findByShowTime(showTime);
		List<TicketDTO> ticketDTOs = tickets.stream().map(t -> entityToDTO(t)).collect(Collectors.toList());

		return ticketDTOs;
	}



}
