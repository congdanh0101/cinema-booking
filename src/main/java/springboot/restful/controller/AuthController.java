package springboot.restful.controller;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import springboot.restful.config.security.JwtTokenHelper;
import springboot.restful.exception.ApiException;
import springboot.restful.exception.ErrorDetails;
import springboot.restful.model.payloads.LoginRequest;
import springboot.restful.model.payloads.UserDTO;
import springboot.restful.repository.UserRepository;
import springboot.restful.service.UserService;

import javax.servlet.http.HttpServletRequest;
import javax.validation.Valid;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/api/auth")
public class AuthController {

    @Autowired
    private JwtTokenHelper jwtTokenHelper;

    @Autowired
    private AuthenticationManager authenticationManager;

    @Autowired
    private UserDetailsService userDetailsService;

    @Autowired
    private UserService userService;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private HttpServletRequest request;

    private void authenticate(String username, String password) throws Exception {
        UsernamePasswordAuthenticationToken authenticationToken = new UsernamePasswordAuthenticationToken(username, password);
        try {
            this.authenticationManager.authenticate(authenticationToken);
        } catch (BadCredentialsException e) {
            throw new ApiException("Invalid username or password");
        }
    }


    @PostMapping("/login")
    public ResponseEntity<?> createToken(@Valid @RequestBody LoginRequest request) throws Exception {
        this.authenticate(request.getUsername(), request.getPassword());

        UserDetails userDetails = this.userDetailsService.loadUserByUsername(request.getUsername());

        String token = jwtTokenHelper.generateToken(userDetails);

        Map<String, String> respone = new HashMap<>();
        respone.put("token", token);
        return new ResponseEntity<>(respone, HttpStatus.OK);
    }

    @PostMapping("/register")
    public ResponseEntity<?> createUser(@Valid @RequestBody UserDTO userDTO) {
//		if (checkPhone(userDTO.getPhoneNumber()))
//			return new ResponseEntity<UserDTO>(userService.createUser(userDTO), HttpStatus.CREATED);
//		else
//			return new ResponseEntity<ErrorDetails>(new ErrorDetails(new Date().toLocaleString(),
//					HttpStatus.BAD_REQUEST.toString(), "Phone number is not suitable", request.getRequestURI(),
//					request.getMethod()),
//					HttpStatus.BAD_REQUEST);

        if (checkPhone(userDTO.getPhoneNumber()) && !userRepository.existsByEmail(userDTO.getEmail())
                && !userRepository.existsByPhoneNumber(userDTO.getPhoneNumber()))
            return new ResponseEntity<UserDTO>(userService.createUser(userDTO), HttpStatus.CREATED);
        else if (userRepository.existsByEmail(userDTO.getEmail()))
            return new ResponseEntity<ErrorDetails>(
                    new ErrorDetails(new Date().toLocaleString(), HttpStatus.BAD_REQUEST.toString(),
                            "Duplicate entry '" + userDTO.getEmail()
                                    + "' for field 'email'. Please enter another email!",
                            request.getRequestURI(), request.getMethod()),
                    HttpStatus.BAD_REQUEST);
        else if (userRepository.existsByPhoneNumber(userDTO.getPhoneNumber()))
            return new ResponseEntity<ErrorDetails>(
                    new ErrorDetails(new Date().toLocaleString(), HttpStatus.BAD_REQUEST.toString(),
                            "Duplicate entry '" + userDTO.getPhoneNumber()
                                    + "' for field 'phoneNumber'. Please enter another phone number!",
                            request.getRequestURI(), request.getMethod()),
                    HttpStatus.BAD_REQUEST);
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
