package springboot.restful.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import springboot.restful.exception.ErrorDetails;
import springboot.restful.model.payloads.UserDTO;
import springboot.restful.repository.UserRepository;
import springboot.restful.service.UserService;

import javax.servlet.http.HttpServletRequest;
import javax.validation.Valid;
import java.util.Date;
import java.util.List;

@RestController
@RequestMapping("/api/users")
public class UserController {

    @Autowired
    private UserService userService;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private HttpServletRequest request;

    @GetMapping("")
    public ResponseEntity<List<UserDTO>> getAllUsers() {
        return new ResponseEntity<List<UserDTO>>(userService.getAllUsers(), HttpStatus.OK);

    }

//    @SuppressWarnings("deprecation")
//    @PostMapping("/register")
//    public ResponseEntity<?> createUser(@Valid @RequestBody UserDTO userDTO) {
////		if (checkPhone(userDTO.getPhoneNumber()))
////			return new ResponseEntity<UserDTO>(userService.createUser(userDTO), HttpStatus.CREATED);
////		else
////			return new ResponseEntity<ErrorDetails>(new ErrorDetails(new Date().toLocaleString(),
////					HttpStatus.BAD_REQUEST.toString(), "Phone number is not suitable", request.getRequestURI(),
////					request.getMethod()),
////					HttpStatus.BAD_REQUEST);
//
//        if (checkPhone(userDTO.getPhoneNumber()) && !userRepository.existsByEmail(userDTO.getEmail())
//                && !userRepository.existsByPhoneNumber(userDTO.getPhoneNumber()))
//            return new ResponseEntity<UserDTO>(userService.createUser(userDTO), HttpStatus.CREATED);
//        else if (userRepository.existsByEmail(userDTO.getEmail()))
//            return new ResponseEntity<ErrorDetails>(
//                    new ErrorDetails(new Date().toLocaleString(), HttpStatus.BAD_REQUEST.toString(),
//                            "Duplicate entry '" + userDTO.getEmail()
//                                    + "' for field 'email'. Please enter another email!",
//                            request.getRequestURI(), request.getMethod()),
//                    HttpStatus.BAD_REQUEST);
//        else if (userRepository.existsByPhoneNumber(userDTO.getPhoneNumber()))
//            return new ResponseEntity<ErrorDetails>(
//                    new ErrorDetails(new Date().toLocaleString(), HttpStatus.BAD_REQUEST.toString(),
//                            "Duplicate entry '" + userDTO.getPhoneNumber()
//                                    + "' for field 'phoneNumber'. Please enter another phone number!",
//                            request.getRequestURI(), request.getMethod()),
//                    HttpStatus.BAD_REQUEST);
//        else
//            return new ResponseEntity<ErrorDetails>(
//                    new ErrorDetails(new Date().toLocaleString(), HttpStatus.BAD_REQUEST.toString(),
//                            "Phone number is not suitable", request.getRequestURI(), request.getMethod()),
//                    HttpStatus.BAD_REQUEST);
//
//    }

    @GetMapping("/{id}")
    public ResponseEntity<UserDTO> getUserById(@PathVariable Integer id) {
        return new ResponseEntity<UserDTO>(userService.getUserById(id), HttpStatus.OK);
    }

    @PutMapping("/{id}")
    public ResponseEntity<?> updateUser(@PathVariable Integer id, @Valid @RequestBody UserDTO userDTO) {
        if (checkPhone(userDTO.getPhoneNumber()))
            return new ResponseEntity<UserDTO>(userService.updateUser(id, userDTO), HttpStatus.OK);
        else
            return new ResponseEntity<ErrorDetails>(
                    new ErrorDetails(new Date().toLocaleString(), HttpStatus.BAD_REQUEST.toString(),
                            "Phone number is not suitable", request.getRequestURI(), request.getMethod()),
                    HttpStatus.BAD_REQUEST);
    }

    private boolean checkPhone(String phoneNumber) {
        String reg = "^(0|\\+84)(\\s|\\.)?((3[2-9])|(5[689])|(7[06-9])|(8[1-689])|(9[0-46-9]))(\\d)(\\s|\\.)?(\\d{3})(\\s|\\.)?(\\d{3})$";
        return phoneNumber.matches(reg);
    }

}
