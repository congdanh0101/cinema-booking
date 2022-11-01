package springboot.restful.service.implement;


import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import springboot.restful.model.entity.OrderDetail;
import springboot.restful.model.payloads.OrderDetailDTO;
import springboot.restful.repository.OrderDetailsRepository;
import springboot.restful.service.OrderDetailService;
import springboot.restful.util.ModelMapping;

import java.util.List;

@Service
public class OrderDetailServiceImp implements OrderDetailService, ModelMapping<OrderDetail, OrderDetailDTO> {

	@Autowired
	private OrderDetailsRepository orderDetailsRepository;

	@Autowired
	private ModelMapper modelMapper;


	@Override
	public OrderDetail dtoToEntity(OrderDetailDTO orderDetailDTO) {
		return modelMapper.map(orderDetailDTO, OrderDetail.class);
	}

	@Override
	public OrderDetailDTO entityToDTO(OrderDetail orderDetail) {
		return modelMapper.map(orderDetail, OrderDetailDTO.class);
	}

	@Override
	public OrderDetailDTO createOrderDetail(OrderDetailDTO orderDetailDTO) {
		OrderDetail orderDetail = dtoToEntity(orderDetailDTO);
		return entityToDTO(orderDetailsRepository.save(orderDetail));
	}

	@Override
	public List<OrderDetail> getOrderDetailByOrder(int idOrder) {
		return null;
	}
}
