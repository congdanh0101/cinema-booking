package springboot.restful.util;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;

import org.springframework.stereotype.Component;
import springboot.restful.model.entity.Theater;
import springboot.restful.repository.TheaterRepository;


public class InitTheaterData{

	@Autowired
	private TheaterRepository theaterRepository;

	public void initData() {
		// TODO Auto-generated method stub
		Theater theater = new Theater();

		for (int i = 1; i <= 5; i++) {
			theater.setId(i);
			theater.setName("Screen " + String.valueOf(i));
			theaterRepository.save(theater);
		}
	}

}
