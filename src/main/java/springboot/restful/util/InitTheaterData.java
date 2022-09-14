package springboot.restful.util;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;

import org.springframework.stereotype.Component;
import springboot.restful.model.entity.Theater;
import springboot.restful.repository.TheaterRepository;

//@Component
public class InitTheaterData implements CommandLineRunner {

	@Autowired
	private TheaterRepository theaterRepository;

	@Override
	public void run(String... args) throws Exception {
		// TODO Auto-generated method stub
		Theater theater = new Theater();

		for (int i = 1; i <= 5; i++) {
			theater.setId(i);
			theater.setName("Screen " + String.valueOf(i));
			theaterRepository.save(theater);
		}
	}

}
