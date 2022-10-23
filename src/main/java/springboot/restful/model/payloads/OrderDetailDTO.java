package springboot.restful.model.payloads;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class OrderDetailDTO {
	private int id;
	private ProductDTO product;
	private int price;
	private int quantity;
	private OrderDTO orderDTO;
}
