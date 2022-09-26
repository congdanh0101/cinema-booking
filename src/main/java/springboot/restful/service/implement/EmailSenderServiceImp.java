package springboot.restful.service.implement;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Service;
import springboot.restful.service.EmailSenderService;

import javax.mail.MessagingException;
import javax.mail.internet.MimeMessage;
import java.util.Date;


@Service
public class EmailSenderServiceImp implements EmailSenderService {

    @Autowired
    private JavaMailSender mailSender;

    @Value("${spring.mail.username}")
    private String fromEmail;

    @Override
    public void sendEmail(String toEmail, String subject, String body) throws MessagingException {

        MimeMessage mess = mailSender.createMimeMessage();
        MimeMessageHelper helper = new MimeMessageHelper(mess, "utf-8");
        helper.setText(body, true);
        helper.setTo(toEmail);
        helper.setFrom(fromEmail);
        helper.setSubject(subject);
        helper.setSentDate(new Date());
//        SimpleMailMessage message = new SimpleMailMessage();
//        message.setFrom(fromEmail);
//        message.setTo(toEmail);
//        message.setSubject(subject);
//        message.setText(body);
        mailSender.send(mess);
        System.out.println("Mail was sent successfully");
    }
}
