package springboot.restful.service;

import springboot.restful.model.payloads.ProductDTO;

import java.util.List;

public interface ProductService {

	//create
	ProductDTO createProduct(ProductDTO productDTO);

	//get
	List<ProductDTO> getAllProducts();

	//get by id
	ProductDTO getProductById(int id);

	//update
	ProductDTO updateProduct(int id, ProductDTO productDTO);

	//delete
	void deleteProduct(int id);

}
