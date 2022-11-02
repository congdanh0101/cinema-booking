package springboot.restful.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import springboot.restful.model.entity.Order;
import springboot.restful.model.entity.OrderDetail;

import java.util.List;

@Repository
public interface OrderDetailsRepository extends JpaRepository<OrderDetail, Integer> {

	List<OrderDetail> findByOrder(Order order);

}
