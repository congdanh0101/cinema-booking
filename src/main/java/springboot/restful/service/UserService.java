package springboot.restful.service;

import springboot.restful.model.payloads.UserDTO;

import java.util.List;

public interface UserService {

    // Create

    UserDTO createUser(UserDTO userDTO);

    // get
    UserDTO getUserById(Integer id);

    List<UserDTO> getAllUsers();

    // update
    UserDTO updateUser(Integer id, UserDTO userDTO);

}
