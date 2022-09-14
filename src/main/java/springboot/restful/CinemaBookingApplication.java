package springboot.restful;

import java.util.Date;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

import lombok.extern.slf4j.Slf4j;
import springboot.restful.model.dto.ShowTimeDTO;
import springboot.restful.repository.RoleRepository;
import springboot.restful.repository.UserRepository;
import springboot.restful.service.ShowTimeService;

@SpringBootApplication
@Slf4j
public class CinemaBookingApplication implements CommandLineRunner {

	@Autowired
	private RoleRepository roleRepository;

	@Autowired
	private UserRepository userRepository;

	@Autowired
	private ShowTimeService showTimeService;

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

		List<ShowTimeDTO> showTimeDTOs = showTimeService.getAllShowTime();
		Date date = new Date(2022, 9, 14);
//		showTimeDTOs.stream()
//				.filter(st -> st.getShowDate().getDate() == date.getDate()
//						&& st.getShowDate().getMonth() == date.getMonth()
//						&& st.getShowDate().getYear() == date.getYear())
//				.collect(Collectors.toList()).stream().forEach(st -> log.warn(st.toString()));

		for (ShowTimeDTO st : showTimeDTOs) {
			if (st.getShowDate().getDate() == date.getDate())
				log.warn(st.toString());
		}

//		System.out.println(new Date().getTime());

	}

}
