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
	@JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "dd-MM-yyyy")
	private Date showDate;

	@JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "HH:mm")
	private Date timeStart;

	@JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "HH:mm")
	private Date timeEnd;

	private int price;

	private MovieDTO movie;

	private TheaterDTO theater;

//	private Collection<TicketDTO> tickets = new HashSet<>();
}
