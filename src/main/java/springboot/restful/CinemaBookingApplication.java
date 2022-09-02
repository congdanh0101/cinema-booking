package springboot.restful;

import java.util.ArrayList;
import java.util.Collection;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;

import springboot.restful.config.AppConstant;
import springboot.restful.model.entity.Role;
import springboot.restful.model.enums.ERole;
import springboot.restful.repository.RoleRepository;

@SpringBootApplication
public class CinemaBookingApplication implements CommandLineRunner {

	@Autowired
	private RoleRepository roleRepository;

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
		Collection<Role> roles = new ArrayList<>();
		roles.add(new Role(AppConstant.ROLE_ADMIN, ERole.ROLE_ADMIN));
		roles.add(new Role(AppConstant.ROLE_USER, ERole.ROLE_USER));
		roleRepository.saveAll(roles);
		roles.forEach(r -> System.out.println(r));
	}

}
