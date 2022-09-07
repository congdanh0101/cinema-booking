package springboot.restful.model.entity;

import java.util.Collection;
import java.util.Date;
import java.util.HashSet;

import javax.persistence.CascadeType;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.OneToMany;
import javax.persistence.OneToOne;
import javax.persistence.Temporal;
import javax.persistence.TemporalType;

import lombok.Data;

@Entity
@Data
public class ShowTime {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private int id;

	@Temporal(TemporalType.DATE)
	private Date showDate;

	@Temporal(TemporalType.TIME)
	private Date showTime;

	@OneToOne(cascade = CascadeType.ALL, fetch = FetchType.LAZY)
	@JoinColumn(name = "movie_id")
	private Movie movie;

	@OneToOne(cascade = CascadeType.ALL, fetch = FetchType.LAZY)
	@JoinColumn(name = "theater_id")
	private Theater theater;

	@OneToMany(mappedBy = "showTime", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
	private Collection<Ticket> tickets = new HashSet<>();
}
