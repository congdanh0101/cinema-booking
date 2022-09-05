package springboot.restful.model.dto;

import java.util.Date;
import java.util.HashSet;
import java.util.Set;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class MovieDTO {

	private int id;

	@NotBlank
	private String name;

	@NotNull
	private Integer duration;

	private String description;
	private String image;
	private String trailer;
	private Date releases;
	private Set<GenreDTO> genres = new HashSet<>();
	private boolean isShowing;
	private boolean isComming;
	private boolean isDisplay;


}
