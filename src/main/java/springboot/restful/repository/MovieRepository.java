package springboot.restful.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import springboot.restful.model.entity.Movie;

import java.util.List;

@Repository
public interface MovieRepository extends JpaRepository<Movie, Integer> {

    List<Movie> findByIsDisplay(boolean isDisplay);

    List<Movie> findByIsComing(boolean isComing);

    List<Movie> findByIsShowing(boolean isShowing);
}
