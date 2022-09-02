package springboot.restful.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import springboot.restful.model.entity.ShowTime;

@Repository
public interface ShowTimeRepository extends JpaRepository<ShowTime, Integer> {

}
