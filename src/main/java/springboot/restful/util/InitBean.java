package springboot.restful.util;

import java.util.TimeZone;

import javax.annotation.PostConstruct;

import org.modelmapper.ModelMapper;
import org.springframework.context.annotation.Bean;
import org.springframework.stereotype.Component;

import lombok.extern.slf4j.Slf4j;

@Component
@Slf4j
public class InitBean {

	@Bean
	public ModelMapper modelMapper() {
		return new ModelMapper();
	}

}
