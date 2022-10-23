package springboot.restful.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import springboot.restful.model.entity.Order;

@Repository
public interface OrderRepository extends JpaRepository<Order, Integer> {
}
