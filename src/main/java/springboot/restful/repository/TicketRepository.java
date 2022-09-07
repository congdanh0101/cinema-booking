package springboot.restful.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import springboot.restful.model.entity.Ticket;

@Repository
public interface TicketRepository extends JpaRepository<Ticket, Integer> {

}
