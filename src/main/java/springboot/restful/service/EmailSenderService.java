package springboot.restful.service;

import javax.mail.MessagingException;

public interface EmailSenderService {

    void sendEmail(String toEmail, String subject, String body) throws MessagingException;

}
