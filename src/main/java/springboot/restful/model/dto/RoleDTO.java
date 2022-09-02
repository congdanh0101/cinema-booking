package springboot.restful.model.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import springboot.restful.model.enums.ERole;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class RoleDTO {

	private int id;
	private ERole name;
}
