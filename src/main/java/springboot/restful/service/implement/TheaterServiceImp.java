package springboot.restful.service.implement;

import java.util.List;
import java.util.stream.Collectors;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import springboot.restful.exception.ResourceNotFoundException;
import springboot.restful.model.dto.TheaterDTO;
import springboot.restful.model.entity.Theater;
import springboot.restful.repository.TheaterRepository;
import springboot.restful.service.TheaterService;
import springboot.restful.util.ModelMapping;

@Service
public class TheaterServiceImp implements TheaterService, ModelMapping<Theater, TheaterDTO> {

	@Autowired
	private ModelMapper modelMapper;

	@Autowired
	private TheaterRepository theaterRepository;

	@Override
	public Theater dtoToEntity(TheaterDTO dto) {
		return this.modelMapper.map(dto, Theater.class);
	}

	@Override
	public TheaterDTO entityToDTO(Theater entity) {
		return this.modelMapper.map(entity, TheaterDTO.class);
	}

	@Override
	public TheaterDTO geTheaterById(int id) {

		Theater theater = theaterRepository.findById(id)
				.orElseThrow(() -> new ResourceNotFoundException("Theater", "id", id));

		return entityToDTO(theater);

	}

	@Override
	public List<TheaterDTO> getAllTheaters() {
		return theaterRepository.findAll().stream().map(th -> entityToDTO(th)).collect(Collectors.toList());
	}

}
