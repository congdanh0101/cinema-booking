package springboot.restful.model.entity;

import java.util.HashSet;
import java.util.Set;

import javax.persistence.*;

import org.hibernate.validator.constraints.Email;

import lombok.Data;
import springboot.restful.model.enums.EGender;

@SuppressWarnings("deprecation")
@Entity
@Data
@Table(name = "users")
public class User {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private int id;

	@Column(nullable = false)
	private String firstName;

	@Column(nullable = false)
	private String lastName;

	@Column(unique = true, nullable = false)
	private String phoneNumber;

	@Email
	@Column(unique = true, nullable = false)
	private String email;

	@Column(nullable = false)
	private String password;

	@Enumerated(EnumType.STRING)
	@Column(nullable = false)
	private EGender gender;

	@ManyToMany(cascade = CascadeType.ALL, fetch = FetchType.EAGER)
	@JoinTable(name = "users_roles", joinColumns = @JoinColumn(name = "users", referencedColumnName = "id"), inverseJoinColumns = @JoinColumn(name = "roles", referencedColumnName = "id"))
	private Set<Role> roles = new HashSet<>();

}
