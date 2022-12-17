package springboot.restful.controller;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import springboot.restful.exception.ApiException;
import springboot.restful.exception.ApiRespone;
import springboot.restful.model.payloads.OrderDTO;
import springboot.restful.model.payloads.OrderDetailDTO;
import springboot.restful.model.payloads.TicketDTO;
import springboot.restful.service.EmailSenderService;
import springboot.restful.service.OrderDetailService;
import springboot.restful.service.OrderService;

import javax.mail.MessagingException;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

@RestController
@RequestMapping("/api/pay")
@CrossOrigin(origins = "*")
public class PayController {

    @Autowired
    private OrderDetailService orderDetailService;

    @Autowired
    private OrderService orderService;

    @Autowired
    private EmailSenderService emailSenderService;


    @PostMapping("/orders/{id}")
    ResponseEntity<?> payOrder(@PathVariable int id) throws MessagingException {
        OrderDTO orderDTO = orderService.getOrderById(id);
        if (orderDTO.isPaid())
            throw new ApiException("Order is paid");
        orderService.payOrder(id, true);
        List<OrderDetailDTO> orderDetailDTOList = orderDetailService.getOrderDetailsByOrder(orderDTO.getId());
        List<TicketDTO> ticketDTOS = new ArrayList<>();
        orderDetailDTOList.forEach(odd -> ticketDTOS.add(odd.getTicket()));
        emailSenderService.sendEmail(orderDTO.getUser().getEmail(), "BILL ORDER DETAIL", emailSenderService.htmlGenerateTicket(ticketDTOS));
        return ResponseEntity.ok(new ApiRespone(new Date().toLocaleString(), "Order was paid successfully", true));
    }

}
