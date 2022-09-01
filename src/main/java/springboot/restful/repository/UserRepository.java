package springboot.restful.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import springboot.restful.model.entity.User;

@Repository
public interface UserRepository extends JpaRepository<User, Integer> {

}