package springboot.restful.service;

import springboot.restful.model.payloads.OrderDetailDTO;

import java.util.List;

public interface OrderDetailService {

	OrderDetailDTO createOrderDetail(OrderDetailDTO orderDetailDTO);


	List<OrderDetailDTO> getOrderDetailsByOrder(int idOrder);

	OrderDetailDTO getOrderDetailById(int idOrderDetail);

}
