package springboot.restful.service;

import springboot.restful.model.entity.User;
import springboot.restful.model.payloads.OrderDTO;
import springboot.restful.model.payloads.OrderDetailDTO;

import java.util.List;

public interface OrderService {

	//create
	OrderDTO createOrder(User user);

	//get

	List<OrderDTO> getAllOrders();

	OrderDTO getOrderById(int id);

	//update
	OrderDTO updateOrder(int id, List<OrderDetailDTO> orderDetailDTOS);

}
