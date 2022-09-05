package springboot.restful.model.entity;

import javax.persistence.Entity;
import javax.persistence.Id;

import lombok.Data;

@Entity
@Data
public class Theater {

	@Id
	private int id;

	private String name;

}
