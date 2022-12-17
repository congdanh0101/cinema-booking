package springboot.restful.controller;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import springboot.restful.service.OrderDetailService;
import springboot.restful.service.OrderService;

@RestController
@RequestMapping("/api/pay")
public class PayController {

	@Autowired
	private OrderDetailService orderDetailService;

	@Autowired
	private OrderService orderService;


}
