package springboot.restful.service.implement;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import springboot.restful.exception.ResourceNotFoundException;
import springboot.restful.model.entity.Order;
import springboot.restful.model.entity.User;
import springboot.restful.model.payloads.OrderDTO;
import springboot.restful.model.payloads.OrderDetailDTO;
import springboot.restful.model.payloads.UserDTO;
import springboot.restful.repository.OrderRepository;
import springboot.restful.service.OrderService;
import springboot.restful.util.ModelMapping;

import java.sql.Time;
import java.util.Date;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class OrderServiceImp implements OrderService, ModelMapping<Order, OrderDTO> {

	@Autowired
	private OrderRepository orderRepository;

	@Autowired
	private ModelMapper modelMapper;

	@Override
	public OrderDTO createOrder(User user) {
		Order order = new Order();
		Date dt = new Date();

		java.sql.Date date = new java.sql.Date(dt.getTime());
		Time time = new Time(dt.getTime());

		order.setDate(date);
		order.setTime(String.valueOf(time));
		order.setUser(user);
		order.setTotal(0);
		order.setPaid(false);

		OrderDTO orderDTO = entityToDTO(orderRepository.save(order));
		orderDTO.setUserDTO(modelMapper.map(user, UserDTO.class));
		return orderDTO;
	}

	@Override
	public List<OrderDTO> getAllOrders() {
		return orderRepository.findAll().stream().map(this::entityToDTO).collect(Collectors.toList());
	}

	@Override
	public OrderDTO getOrderById(int id) {
		Order order = orderRepository.findById(id).orElseThrow(() -> new ResourceNotFoundException("Order", "id", id));
		return entityToDTO(order);
	}

	@Override
	public OrderDTO updateOrder(int id, List<OrderDetailDTO> orderDetailDTOS) {
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
