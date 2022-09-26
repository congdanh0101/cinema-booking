package springboot.restful;

import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import springboot.restful.repository.RoleRepository;
import springboot.restful.repository.UserRepository;
import springboot.restful.service.EmailSenderService;
import springboot.restful.service.ShowTimeService;

import java.math.BigInteger;
import java.security.SecureRandom;
import java.time.LocalTime;
import java.util.UUID;

@SpringBootApplication
@Slf4j
public class CinemaBookingApplication implements CommandLineRunner {

    @Autowired
    private RoleRepository roleRepository;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private ShowTimeService showTimeService;

    @Autowired
    private EmailSenderService emailSenderService;

    public static void main(String[] args) {
        SpringApplication.run(CinemaBookingApplication.class, args);
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

//        List<ShowTimeDTO> showTimeDTOs = showTimeService.getAllShowTime();
//        Date date = new Date(2022, 9, 16);
//        for (ShowTimeDTO st : showTimeDTOs) {
//            if (st.getShowDate().getDate() == date.getDate()){
//
//                LocalTime t = LocalTime.parse(st.getTimeEnd());
//
//                log.error("Time End: "+ t.getHour());
//
//                log.warn(st.toString());
//            }
//        }

        String start = "08:00";
        String stop = "22:00";

        String now = "08:01";

        LocalTime startLC = LocalTime.parse(start);
        LocalTime stopLC = LocalTime.parse(stop);
        LocalTime timeStartLC = LocalTime.parse(now);

//        System.out.println(timeStartLC.isAfter(startLC) && timeStartLC.isBefore(stopLC) );

        System.out.println(timeStartLC.equals(startLC));

        SecureRandom random = new SecureRandom();
        String randomCode = new BigInteger(30, random).toString(32).toUpperCase();

        System.out.println(UUID.randomUUID().toString().substring(0, 8).toUpperCase());
    }

//    @EventListener(ApplicationReadyEvent.class)
//    public void sendMail() {
//        emailSenderService.sendEmail("danhrow001@gmail.com", "this is subject", "hello Danh");
//    }

}
