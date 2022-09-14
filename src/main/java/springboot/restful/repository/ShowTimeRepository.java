package springboot.restful.repository;

import java.util.Date;
import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import springboot.restful.model.entity.ShowTime;
import springboot.restful.model.entity.Theater;

@Repository
public interface ShowTimeRepository extends JpaRepository<ShowTime, Integer> {


	List<ShowTime> findByShowDate(Date showDate);

	List<ShowTime> findByTheater(Theater theater);

	List<ShowTime> findByShowDateAndTheaterOrderByTimeEndAsc(Date showDate, Theater theater);
}
