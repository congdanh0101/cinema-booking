package springboot.restful;

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

import java.security.SecureRandom;
import java.time.LocalTime;

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

//        System.out.println(timeStartLC.equals(startLC));

		SecureRandom random = new SecureRandom();
//        String randomCode = new BigInteger(30, random).toString(32).toUpperCase();
//
//        System.out.println(UUID.randomUUID().toString().substring(0, 8).toUpperCase());
//
//        System.out.println(new Date(System.currentTimeMillis() + 60 * 1000).getTime());

//        User user = userRepository.findById(1).get();
//
//        System.out.println(passwordEncoder.matches("123", user.getPassword()));
//
//		User user = User.builder().email("congdanh.01.01.2001@gmail.com").firstName("Danh").lastName("Bui").gender(EGender.MALE).phoneNumber("0902891404").password("congdanh010101").build();
//
//		UserDTO userDTO = modelMapper.map(user, UserDTO.class);
//
//		userService.createUser(userDTO);

		System.out.println(passwordEncoder.encode("congdanh010101"));

	}

//    @EventListener(ApplicationReadyEvent.class)
//    public void sendMail() {
//        emailSenderService.sendEmail("danhrow001@gmail.com", "this is subject", "hello Danh");
//    }

}
