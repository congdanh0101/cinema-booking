package springboot.restful.model.dto;

import java.util.Date;

import com.fasterxml.jackson.annotation.JsonFormat;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class ShowTimeDTO {
	private int id;

//	@JsonFormat(pattern = "EEE")
	@JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "EEE dd/MM/yyyy")
	private Date showDate;

	@JsonFormat(pattern = "HH:mm:ss")
	private Date showTime;

	private MovieDTO movie;

	private TheaterDTO theater;

//	private Collection<TicketDTO> tickets = new HashSet<>();
}
