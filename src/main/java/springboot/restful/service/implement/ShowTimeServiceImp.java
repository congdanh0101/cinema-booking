package springboot.restful.service.implement;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import springboot.restful.exception.ResourceNotFoundException;
import springboot.restful.model.dto.ShowTimeDTO;
import springboot.restful.model.entity.ShowTime;
import springboot.restful.repository.ShowTimeRepository;
import springboot.restful.service.ShowTimeService;
import springboot.restful.util.ModelMapping;

@Service
public class ShowTimeServiceImp implements ShowTimeService, ModelMapping<ShowTime, ShowTimeDTO> {

	@Autowired
	private ModelMapper modelMapper;

	@Autowired
	private ShowTimeRepository showTimeRepository;

	@Override
	public ShowTimeDTO getShowTimeById(int id) {

		ShowTime showTime = showTimeRepository.findById(id)
				.orElseThrow(() -> new ResourceNotFoundException("ShowTime", "id", id));
		return entityToDTO(showTime);
	}

	@Override
	public ShowTime dtoToEntity(ShowTimeDTO dto) {
		return this.modelMapper.map(dto, ShowTime.class);
	}

	@Override
	public ShowTimeDTO entityToDTO(ShowTime entity) {
		return this.modelMapper.map(entity, ShowTimeDTO.class);
	}

}
