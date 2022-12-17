package springboot.restful;

import com.google.zxing.BarcodeFormat;
import com.google.zxing.MultiFormatWriter;
import com.google.zxing.WriterException;
import com.google.zxing.client.j2se.MatrixToImageWriter;
import com.google.zxing.common.BitMatrix;
import lombok.extern.slf4j.Slf4j;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.security.crypto.password.PasswordEncoder;
import springboot.restful.repository.RoleRepository;
import springboot.restful.repository.UserRepository;
import springboot.restful.service.EmailSenderService;
import springboot.restful.service.ShowTimeService;
import springboot.restful.service.TicketService;
import springboot.restful.service.UserService;

import javax.mail.MessagingException;
import java.io.IOException;
import java.nio.file.Paths;

@SpringBootApplication
@Slf4j
public class CinemaBookingApplication implements CommandLineRunner {

    @Autowired
    private static EmailSenderService emailSenderService;
    @Autowired
    private RoleRepository roleRepository;
    @Autowired
    private UserRepository userRepository;
    @Autowired
    private ShowTimeService showTimeService;
    @Autowired
    private PasswordEncoder passwordEncoder;
    @Autowired
    private UserService userService;
    @Autowired
    private ModelMapper modelMapper;
    @Autowired
    private TicketService ticketService;

    public static void main(String[] args) {
        SpringApplication.run(CinemaBookingApplication.class, args);
    }

    public static void generateCode(String data, String path, String charset, int h, int w) throws WriterException, IOException, MessagingException {
        BitMatrix bitMatrix = new MultiFormatWriter().encode(data, BarcodeFormat.QR_CODE, w, h);
        MatrixToImageWriter.writeToPath(bitMatrix, path.substring(path.lastIndexOf('.') + 1), Paths.get(path));
    }

    public boolean checkPhone(String phoneNumber) {
        String reg = "^(0|\\+84)(\\s|\\.)?((3[2-9])|(5[689])|(7[06-9])|(8[1-689])|(9[0-46-9]))(\\d)(\\s|\\.)?(\\d{3})(\\s|\\.)?(\\d{3})$";
        if (phoneNumber.startsWith("+84")) {
            phoneNumber = "0" + phoneNumber.substring(3);
            System.out.println(phoneNumber);
        }
        return phoneNumber.matches(reg);
    }

    @Override
    public void run(String... args) throws Exception {

    }


}
