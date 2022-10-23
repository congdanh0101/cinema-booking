package springboot.restful.controller;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import springboot.restful.config.security.JwtTokenHelper;
import springboot.restful.model.entity.User;
import springboot.restful.repository.UserRepository;
import springboot.restful.service.OrderService;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

@RestController
@RequestMapping("/api/orders")
public class OrderController {

	@Autowired
	private OrderService orderService;

	@Autowired
	private JwtTokenHelper jwtTokenHelper;

	@Autowired
	private HttpServletRequest request;

	@Autowired
	private HttpServletResponse response;

	@Autowired
	private UserRepository userRepository;

	@PostMapping("")
	public ResponseEntity<?> createNewOrder() {
		return ResponseEntity.ok().body(orderService.createOrder(decodeJwtToUsername()));
	}


	private User decodeJwtToUsername() {
		Authentication authentication = SecurityContextHolder.getContext().getAuthentication();

		String username = authentication.getName();

		return userRepository.findByEmail(username).orElseThrow(() -> new UsernameNotFoundException("Username not found"));

	}

}
