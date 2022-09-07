package springboot.restful.model.entity;

import java.util.Collection;
import java.util.HashSet;

import javax.persistence.CascadeType;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.Id;
import javax.persistence.OneToMany;

import lombok.Data;

@Entity
@Data
public class Seat {

	@Id
	private int id;
	private String name; // A1, A2, B1, B2, ...

	@OneToMany(mappedBy = "seat", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
	private Collection<Ticket> tickets = new HashSet<>();

//	@OneToOne(mappedBy = "seat", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
//	private Ticket ticket;

}
