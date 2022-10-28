package springboot.restful.service;

import springboot.restful.model.payloads.OrderDTO;
import springboot.restful.model.payloads.OrderDetailDTO;
import springboot.restful.model.payloads.UserDTO;

import java.util.List;

public interface OrderService {

	//create
	OrderDTO createOrder(UserDTO userDTO);

	//get

	List<OrderDTO> getAllOrders();

	List<OrderDTO> getAllOrdersByUser(int idUser);

	OrderDTO getOrderById(int id);

	//update
	OrderDTO updateOrder(int id, List<OrderDetailDTO> orderDetailDTOS);


}
