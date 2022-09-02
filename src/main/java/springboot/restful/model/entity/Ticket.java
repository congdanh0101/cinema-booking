package springboot.restful.model.entity;

import java.util.Date;

import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.ManyToOne;
import javax.persistence.Temporal;
import javax.persistence.TemporalType;

import lombok.Data;

@Entity
@Data
public class Ticket {

	@Id
	private int id;

	@ManyToOne
	private Seat seat;

	@ManyToOne
	private Movie movie;

	// time
	@ManyToOne
	private ShowTime showTime;

	@ManyToOne
	private Theater theater;

	// date
	@Temporal(TemporalType.DATE)
	private Date showDate;

	private int price;

}
