package springboot.restful.service;

import java.util.List;
import java.util.stream.Collectors;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import springboot.restful.config.AppConstant;
import springboot.restful.exception.ResourceNotFoundException;
import springboot.restful.model.dto.UserDTO;
import springboot.restful.model.entity.Role;
import springboot.restful.model.entity.User;
import springboot.restful.repository.RoleRepository;
import springboot.restful.repository.UserRepository;
import springboot.restful.util.ModelMapping;

public interface UserService {

	// Create

	UserDTO createUser(UserDTO userDTO);

	UserDTO getUserById(Integer id);

	List<UserDTO> getAllUsers();


	@Service
	public class UserServiceImplement implements UserService, ModelMapping<User, UserDTO> {

		@Autowired
		private UserRepository userRepository;

		@Autowired
		private ModelMapper modelMapper;

		@Autowired
		private RoleRepository roleRepository;

		@Override
		public UserDTO createUser(UserDTO userDTO) {

			if (userDTO.getPhoneNumber().startsWith("+84")) {
				userDTO.setPhoneNumber("0" + userDTO.getPhoneNumber().substring(3));
			}

			Role role = roleRepository.findById(AppConstant.ROLE_USER).get();
			User user = dtoToEntity(userDTO);
			user.getRoles().add(role);
			User savedUser = this.userRepository.save(user);
			return this.entityToDTO(savedUser);

		}

		@Override
		public UserDTO getUserById(Integer id) {
			User user = userRepository.findById(id).orElseThrow(() -> new ResourceNotFoundException("User", "id", id));
			return entityToDTO(user);
		}

		@Override
		public List<UserDTO> getAllUsers() {
			return userRepository.findAll().stream().map(u -> entityToDTO(u)).collect(Collectors.toList());

		}

		@Override
		public User dtoToEntity(UserDTO dto) {
			return this.modelMapper.map(dto, User.class);
		}

		@Override
		public UserDTO entityToDTO(User entity) {
			return this.modelMapper.map(entity, UserDTO.class);
		}


	}
}
