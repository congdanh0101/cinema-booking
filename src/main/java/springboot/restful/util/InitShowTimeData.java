package springboot.restful.util;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;

import springboot.restful.repository.ShowTimeRepository;


//@Component
public class InitShowTimeData implements CommandLineRunner{
	@Autowired
	private ShowTimeRepository showTimeRepository;

	@Override
	public void run(String... args) throws Exception {
//		// TODO Auto-generated method stub
//		Time time = new Time(0);
//		int hour = time.getHours();
//		int min = time.getMinutes();
//		ShowTime showTime = new ShowTime();
//		int id = 1;
//		for (int i = hour; i <= 22; i++) {
//			for (int j = min; j <= 55; j += 5) {
//				showTime.setId(id);
//				showTime.setTime(new Time(i, j, 00));
//				showTimeRepository.save(showTime);
//				id++;
//			}
//		}

	}
}
