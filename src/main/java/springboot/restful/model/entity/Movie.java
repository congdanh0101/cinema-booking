package springboot.restful.model.entity;

import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

import javax.persistence.CascadeType;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.JoinTable;
import javax.persistence.ManyToMany;
import javax.persistence.OneToMany;

import lombok.Data;

@Entity
@Data
public class Movie {

	@Id
	private int id;
	private String name;
	private int duration;
	private String description;
	private String image;
	private String trailer;

	private boolean isDisplay;

	@ManyToMany(cascade = CascadeType.ALL, fetch = FetchType.EAGER)
	@JoinTable(name = "movie_genre", joinColumns = @JoinColumn(name = "movie", referencedColumnName = "id"), inverseJoinColumns = @JoinColumn(name = "genre", referencedColumnName = "id"))
	private Set<Genre> genres = new HashSet<>();

	@OneToMany(mappedBy = "movie", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
	private List<Ticket> tickets = new ArrayList<>();
}
