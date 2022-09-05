package springboot.restful.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import springboot.restful.model.entity.Movie;

public interface MovieRepository extends JpaRepository<Movie, Integer> {

}
