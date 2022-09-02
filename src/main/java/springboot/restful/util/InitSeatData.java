package springboot.restful.util;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;

import springboot.restful.model.entity.Seat;
import springboot.restful.repository.SeatRepository;

//@Component
public class InitSeatData implements CommandLineRunner {

	@Autowired
	private SeatRepository seatRepository;

	@Override
	public void run(String... args) throws Exception {
		// TODO Auto-generated method stub

		Seat seat = new Seat();
		int id = 1;
		for (char j = 'A'; j <= 'J'; j++) {
			for (int i = 0; i < 10; i++) {
				seat.setId(id);
				seat.setName(j + "-" + String.valueOf(i));
				seatRepository.save(seat);
				id++;
			}
		}
	}

}
