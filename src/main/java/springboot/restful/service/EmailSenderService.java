package springboot.restful.service;

import springboot.restful.model.payloads.TicketDTO;

import javax.mail.MessagingException;
import java.util.List;

public interface EmailSenderService {

    void sendEmail(String toEmail, String subject, String body) throws MessagingException;

    String htmlEmailVerificationCodeRegister(String code, String name);

    String htmlEmailVerificationCodeForgotPassword(String code, String name);

    String htmlEmailResetPassword(String password);

    String htmlGenerateTicket(List<TicketDTO> ticketDTO);
}
