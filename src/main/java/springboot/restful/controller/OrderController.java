package springboot.restful.controller;


import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.web.bind.annotation.*;
import springboot.restful.config.security.JwtTokenHelper;
import springboot.restful.model.entity.User;
import springboot.restful.model.payloads.OrderDTO;
import springboot.restful.model.payloads.OrderDetailDTO;
import springboot.restful.model.payloads.UserDTO;
import springboot.restful.repository.UserRepository;
import springboot.restful.service.OrderService;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.util.List;

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

	@Autowired
	private ModelMapper modelMapper;

	@PostMapping("")
	public ResponseEntity<?> createNewOrder(@RequestBody List<OrderDetailDTO> orderDetailDTOS) {
		UserDTO userDTO = decodeJwtToUsername();
		OrderDTO orderDTO = orderService.createOrder(orderDetailDTOS);
		return ResponseEntity.ok().body(orderDTO);
	}

	@GetMapping("")
	public ResponseEntity<?> getAllOrders() {
		return ResponseEntity.ok().body(orderService.getAllOrders());
	}

	@GetMapping("/users/{idUser}")
	public ResponseEntity<?> getAllOrdersByUser(@PathVariable int idUser) {
		return ResponseEntity.ok().body(orderService.getAllOrdersByUser(idUser));
	}

	private UserDTO decodeJwtToUsername() {
		Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
		String username = authentication.getName();
		User user = userRepository.findByEmail(username).orElseThrow(() -> new UsernameNotFoundException("Username not found"));
		return modelMapper.map(user, UserDTO.class);
	}

}
