package springboot.restful.controller;

import java.util.Date;
import java.util.List;

import javax.servlet.http.HttpServletRequest;
import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import springboot.restful.exception.ErrorDetails;
import springboot.restful.model.dto.UserDTO;
import springboot.restful.service.UserService;

@RestController
@RequestMapping("/api/users")
public class UserController {

	@Autowired
	private UserService userService;

	@Autowired
	private HttpServletRequest request;

	@GetMapping("")
	public ResponseEntity<List<UserDTO>> getAllUsers() {
		return new ResponseEntity<List<UserDTO>>(userService.getAllUsers(), HttpStatus.OK);

	}

	@PostMapping("")
	public ResponseEntity<?> createUser(@Valid @RequestBody UserDTO userDTO) {
		if (checkPhone(userDTO.getPhoneNumber()))
			return new ResponseEntity<UserDTO>(userService.createUser(userDTO), HttpStatus.CREATED);
		else
			return new ResponseEntity<ErrorDetails>(new ErrorDetails(new Date().toLocaleString(),
					HttpStatus.BAD_REQUEST.toString(), "Phone number is not suitable", request.getRequestURI(),
					request.getMethod()),
					HttpStatus.BAD_REQUEST);

	}

	@GetMapping("/{id}")
	public ResponseEntity<UserDTO> getUserById(@PathVariable Integer id) {
		return new ResponseEntity<UserDTO>(userService.getUserById(id), HttpStatus.OK);
	}

	public boolean checkPhone(String phoneNumber) {
		String reg = "^(0|\\+84)(\\s|\\.)?((3[2-9])|(5[689])|(7[06-9])|(8[1-689])|(9[0-46-9]))(\\d)(\\s|\\.)?(\\d{3})(\\s|\\.)?(\\d{3})$";
		return phoneNumber.matches(reg);
	}

}
