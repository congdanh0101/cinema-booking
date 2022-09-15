package springboot.restful.util;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;

import org.springframework.stereotype.Component;
import springboot.restful.model.entity.Seat;
import springboot.restful.repository.SeatRepository;

//@Component
public class InitSeatData {

	@Autowired
	private SeatRepository seatRepository;

	public void initData(){
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
