package springboot.restful.service.implement;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import springboot.restful.exception.ResourceNotFoundException;
import springboot.restful.model.entity.Product;
import springboot.restful.model.payloads.ProductDTO;
import springboot.restful.repository.ProductRepository;
import springboot.restful.service.ProductService;
import springboot.restful.util.ModelMapping;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class ProductServiceImp implements ProductService, ModelMapping<Product, ProductDTO> {

	@Autowired
	private ModelMapper modelMapper;

	@Autowired
	private ProductRepository productRepository;

	@Override
	public ProductDTO createProduct(ProductDTO productDTO) {
		Product product = dtoToEntity(productDTO);
		return entityToDTO(productRepository.save(product));
	}

	@Override
	public List<ProductDTO> getAllProducts() {
		return productRepository.findAll().stream().map(this::entityToDTO).collect(Collectors.toList());
	}

	@Override
	public ProductDTO getProductById(int id) {

		Product product = productRepository.findById(id).orElseThrow(() -> new ResourceNotFoundException("Product", "id", id));

		return entityToDTO(product);
	}

	@Override
	public ProductDTO updateProduct(int id, ProductDTO productDTO) {
		Product product = productRepository.findById(id).orElseThrow(() -> new ResourceNotFoundException("Product", "id", id));
		product.setName(productDTO.getName());
		product.setPrice(productDTO.getPrice());

		return entityToDTO(productRepository.save(product));
	}

	@Override
	public void deleteProduct(int id) {
		Product product = productRepository.findById(id).orElseThrow(() -> new ResourceNotFoundException("Product", "id", id));
		productRepository.delete(product);
	}

	@Override
	public Product dtoToEntity(ProductDTO productDTO) {
		return modelMapper.map(productDTO, Product.class);
	}

	@Override
	public ProductDTO entityToDTO(Product product) {
		return modelMapper.map(product, ProductDTO.class);
	}
}
