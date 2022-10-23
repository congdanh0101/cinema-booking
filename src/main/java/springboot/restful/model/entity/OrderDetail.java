package springboot.restful.model.entity;


import lombok.Data;

import javax.persistence.*;

@Entity
@Data
@Table(name = "orders_details")
public class OrderDetail {


	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private int id;

	@ManyToOne
	private Product product;
	private int price;
	private int quantity;

	@ManyToOne
	private Order order;

}
