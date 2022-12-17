package springboot.restful;

import com.fasterxml.jackson.databind.ObjectMapper;
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
import org.springframework.boot.web.client.RestTemplateBuilder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.client.RestTemplate;
import springboot.restful.model.payloads.TicketDTO;
import springboot.restful.repository.RoleRepository;
import springboot.restful.repository.UserRepository;
import springboot.restful.service.EmailSenderService;
import springboot.restful.service.ShowTimeService;
import springboot.restful.service.TicketService;
import springboot.restful.service.UserService;
import springboot.restful.util.Utils;

import javax.mail.MessagingException;
import java.io.IOException;
import java.nio.file.Paths;
import java.text.SimpleDateFormat;
import java.util.Date;

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

		RestTemplate restTemplate = new RestTemplateBuilder().build();

//		String data = restTemplate.getForObject("https://freeapi.code4func.com/api/v1/food/detail/f754f617-92b1-4a1b-b516-67f40659cd82", String.class);
		TicketDTO response = ticketService.getTicketById(39);
		String data = ticketService.getTicketById(39).toString();
		String serial = new ObjectMapper().writeValueAsString(data);
//		String url = "fb.com/congdanh.0101";
		String path = "../cinema-booking/src/main/resources/static/huhu.png";
		String charset = "UTF-8";
		generateCode(serial, path, charset, 200, 200);
		SimpleDateFormat f = new SimpleDateFormat("EEEE");

		Date showDate = ticketService.getTicketById(39).getShowTime().getShowDate();
		System.out.println(Utils.getNameOfMonth(showDate.getMonth()));
		System.out.println(showDate.getDate() + Utils.getDayOfMonthSuffix(showDate.getDate()));
		System.out.println(Utils.getNameOfDay(showDate));
		System.out.println(showDate.toString().substring(0, 4));
	}


}
