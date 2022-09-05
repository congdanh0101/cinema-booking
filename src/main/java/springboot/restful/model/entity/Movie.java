package springboot.restful.model.entity;

import java.util.Date;
import java.util.HashSet;
import java.util.Set;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.JoinTable;
import javax.persistence.ManyToMany;
import javax.persistence.Temporal;
import javax.persistence.TemporalType;

import lombok.Data;

@Entity
@Data
public class Movie {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private int id;

	@Column(nullable = false)
	private String name;

	@Column(nullable = false)
	private Integer duration;

	private String description;

	private String image;
	private String trailer;

	@Temporal(TemporalType.DATE)
	private Date releases;

	@ManyToMany(fetch = FetchType.EAGER)
	@JoinTable(name = "movie_genre", joinColumns = @JoinColumn(name = "movie", referencedColumnName = "id"), inverseJoinColumns = @JoinColumn(name = "genre", referencedColumnName = "id"))
	private Set<Genre> genres = new HashSet<>();

	private boolean isShowing;
	private boolean isComming;
	private boolean isDisplay;


}
