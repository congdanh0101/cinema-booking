package springboot.restful.service.implement;

import lombok.extern.slf4j.Slf4j;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
import springboot.restful.exception.ResourceNotFoundException;
import springboot.restful.model.entity.Order;
import springboot.restful.model.entity.OrderDetail;
import springboot.restful.model.entity.User;
import springboot.restful.model.payloads.OrderDTO;
import springboot.restful.model.payloads.OrderDetailDTO;
import springboot.restful.repository.OrderRepository;
import springboot.restful.repository.UserRepository;
import springboot.restful.service.OrderDetailService;
import springboot.restful.service.OrderService;
import springboot.restful.util.ModelMapping;

import java.sql.Time;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.stream.Collectors;

@Service
@Slf4j
public class OrderServiceImp implements OrderService, ModelMapping<Order, OrderDTO> {

	@Autowired
	private OrderRepository orderRepository;

	@Autowired
	private UserRepository userRepository;

	@Autowired
	private OrderDetailService orderDetailService;

	@Autowired
	private ModelMapper modelMapper;

//	public OrderDTO createOrder(UserDTO userDTO) {
//		Order order = new Order();
//		Date dt = new Date();
//
//		java.sql.Date date = new java.sql.Date(dt.getTime());
//		Time time = new Time(dt.getTime());
//
//		User user = modelMapper.map(userDTO, User.class);
//
//		order.setDate(date);
//		order.setTime(String.valueOf(time));
//		order.setUser(user);
//		order.setTotal(0);
//		order.setPaid(false);
//
//		OrderDTO orderDTO = entityToDTO(orderRepository.save(order));
//		orderDTO.setUser(userDTO);
//		return orderDTO;
//	}

	@Override
	public OrderDTO createOrder(List<OrderDetailDTO> orderDetailDTOS) {
		int total = 0;
		Order order = new Order();
		User user = decodeFromJwtTokenToUser();
		Date dt = new Date();
		java.sql.Date date = new java.sql.Date(dt.getTime());
		Time time = new Time(dt.getTime());
		order.setDate(date);
		order.setTime(String.valueOf(time));
		order.setUser(user);

		for (OrderDetailDTO od : orderDetailDTOS) {
			total += od.getTicket().getPrice();
		}
		order.setTotal(total);

//		List<OrderDetail> odds = orderDetailDTOS.stream().map(od -> modelMapper.map(od, OrderDetail.class)).collect(Collectors.toList());
//		order.setOrderDetails(odds);

		Order savedOrder = orderRepository.save(order);
		List<OrderDetail> orderDetails = new ArrayList<>();
		orderDetailDTOS.forEach(odd -> {
			OrderDetail orderDetail = modelMapper.map(odd, OrderDetail.class);
			orderDetail.setOrder(savedOrder);
			OrderDetailDTO orderDetailDTO = modelMapper.map(orderDetail, OrderDetailDTO.class);
			orderDetailService.createOrderDetail(orderDetailDTO);
		});
		return entityToDTO(savedOrder);
	}

	private User decodeFromJwtTokenToUser() {
		Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
		String username = authentication.getName();
		User user = userRepository.findByEmail(username).orElseThrow(() -> new UsernameNotFoundException("Username not found"));
		return user;
	}

	@Override
	public List<OrderDTO> getAllOrders() {
		return orderRepository.findAll().stream().map(this::entityToDTO).collect(Collectors.toList());
	}

	@Override
	public List<OrderDTO> getAllOrdersByUser(int idUser) {
		User user = userRepository.findById(idUser).orElseThrow(() -> new ResourceNotFoundException("User", "id", idUser));
		List<OrderDTO> orderDTOS = orderRepository.findByUser(user).stream().map(this::entityToDTO).collect(Collectors.toList());
		orderDTOS.forEach(od -> {
			Date date = od.getDate();
			Date newDate = new Date();
			newDate.setDate(date.getDate());
			newDate.setMonth(date.getMonth());
			newDate.setYear(date.getYear());
			od.setDate(newDate);
		});
		return orderDTOS;
	}

	@Override
	public OrderDTO getOrderById(int id) {
		Order order = orderRepository.findById(id).orElseThrow(() -> new ResourceNotFoundException("Order", "id", id));
		System.out.println(order.getOrderDetails());
		return entityToDTO(order);
	}

	@Override
	public OrderDTO payOrder(int id, boolean isPaid) {
		Order order = orderRepository.findById(id).orElseThrow(() -> new ResourceNotFoundException("Order", "id", id));
		order.setPaid(isPaid);
		return entityToDTO(orderRepository.save(order));
	}

	@Override
	public OrderDTO updateOrder(int id, List<OrderDetailDTO> orderDetailDTOS) {
		int total = 0;
		Order order = orderRepository.findById(id).orElseThrow(() -> new ResourceNotFoundException("Order", "id", id));
		List<OrderDetail> orderDetails = orderDetailDTOS.stream().map(odd -> modelMapper.map(odd, OrderDetail.class)).collect(Collectors.toList());
		for (OrderDetail od : orderDetails) {
			total += od.getTicket().getPrice();
		}
		order.setOrderDetails(orderDetails);
		order.setTotal(total);

		orderRepository.save(order);

		return null;
	}

	@Override
	public Order dtoToEntity(OrderDTO orderDTO) {
		return modelMapper.map(orderDTO, Order.class);
	}

	@Override
	public OrderDTO entityToDTO(Order order) {
		return modelMapper.map(order, OrderDTO.class);
	}
}
