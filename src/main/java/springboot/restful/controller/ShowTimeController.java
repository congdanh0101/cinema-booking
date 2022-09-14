package springboot.restful.controller;

import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import lombok.extern.slf4j.Slf4j;
import springboot.restful.model.dto.ShowTimeDTO;
import springboot.restful.service.ShowTimeService;

@RestController
@RequestMapping("/api/showtimes")
@Slf4j
public class ShowTimeController {

    @Autowired
    private ShowTimeService showTimeService;

    @PostMapping("/movies/{idMovie}/theaters/{idTheater}")
    public ResponseEntity<?> createShowTime(@Valid @RequestBody ShowTimeDTO showTimeDTO,
                                            @PathVariable(value = "idMovie") int idMovie, @PathVariable(value = "idTheater") int idTheater) {
//		log.error(showTimeDTO.getTimeStart().toLocaleString());
        return new ResponseEntity<ShowTimeDTO>(showTimeService.createShowTime(showTimeDTO, idMovie, idTheater),
                HttpStatus.CREATED);
    }

    @PutMapping("/{idShowTime}/movies/{idMovie}/theaters/{idTheater}")
    public ResponseEntity<?> updateShowTime(@Valid @RequestBody ShowTimeDTO showTimeDTO, @PathVariable(value = "idShowTime") int idShowTime,
                                            @PathVariable(value = "idMovie") int idMovie, @PathVariable(value = "idTheater") int idTheater) {
//		log.error(showTimeDTO.getTimeStart().toLocaleString());
        return new ResponseEntity<ShowTimeDTO>(showTimeService.updateShowTime(showTimeDTO, idMovie, idTheater,idShowTime),
                HttpStatus.OK);
    }

}
