package springboot.restful.service;

import springboot.restful.model.entity.OrderDetail;
import springboot.restful.model.payloads.OrderDetailDTO;

import java.util.List;

public interface OrderDetailService {

	OrderDetailDTO createOrderDetail(OrderDetailDTO orderDetailDTO);

	List<OrderDetail> getOrderDetailByOrder(int idOrder);


}
