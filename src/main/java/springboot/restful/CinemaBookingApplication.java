package springboot.restful;

import java.sql.Time;
import java.time.DayOfWeek;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.Calendar;
import java.util.Date;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;

import springboot.restful.repository.RoleRepository;
import springboot.restful.repository.UserRepository;

@SpringBootApplication
public class CinemaBookingApplication implements CommandLineRunner {

	@Autowired
	private RoleRepository roleRepository;

	@Autowired
	private UserRepository userRepository;

	public static void main(String[] args) {
		SpringApplication.run(CinemaBookingApplication.class, args);
	}

	@Bean
	public ModelMapper modelMapper() {
		return new ModelMapper();
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
//		System.out.println(checkPhone("84902891404"));
//		Collection<Role> roles = new ArrayList<>();
//		roles.add(new Role(AppConstant.ROLE_ADMIN, ERole.ROLE_ADMIN));
//		roles.add(new Role(AppConstant.ROLE_USER, ERole.ROLE_USER));
//		roleRepository.saveAll(roles);
//		roles.forEach(r -> System.out.println(r));

		Date dt = new Date();
		java.sql.Date date = new java.sql.Date(dt.getTime());
		Time tim = new Time(dt.getTime());
		Time t = new Time(0);

		int hour = t.getHours();
		int min = t.getMinutes();

		LocalDate localDate = LocalDate.of(2022, 9, 4);
		Calendar calendar = Calendar.getInstance();
		System.out.println(tim);

		LocalDate today = LocalDate.now();

		System.out.println(calendar.get(Calendar.DAY_OF_WEEK) == Calendar.FRIDAY);

		if (calendar.get(Calendar.DAY_OF_WEEK) == Calendar.SATURDAY
				|| calendar.get(Calendar.DAY_OF_WEEK) == Calendar.SUNDAY
				|| calendar.get(Calendar.DAY_OF_WEEK) == Calendar.FRIDAY) {
			System.out.println(123);
		}

		if (today.getDayOfWeek() == DayOfWeek.FRIDAY) {
			System.out.println("haha");
		}

		LocalDateTime localDateTime = LocalDateTime.now();

		Time start = new Time(1, 0, 0);
		Time stop = new Time(15, 00, 00);

		Time t3 = new Time(dt.getTime());

		Date date3 = new Date();

		System.out.println(start);

		if (t3.after(start) && t3.before(stop)) {
			System.out.println("t3 true");
		} else
			System.out.println("t3 false");


	}

}
