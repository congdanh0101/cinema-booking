package springboot.restful.service;

import java.util.List;

import springboot.restful.model.dto.UserDTO;

public interface UserService {

	// Create

	UserDTO createUser(UserDTO userDTO);

	// get
	UserDTO getUserById(Integer id);

	List<UserDTO> getAllUsers();

	// update
	UserDTO updateUser(Integer id, UserDTO userDTO);

}
