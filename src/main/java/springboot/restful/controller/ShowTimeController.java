package springboot.restful.controller;

import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import springboot.restful.exception.ApiRespone;
import springboot.restful.model.payloads.ShowTimeDTO;
import springboot.restful.service.ShowTimeService;

import javax.validation.Valid;
import java.util.Date;
import java.util.List;

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
        return new ResponseEntity<ShowTimeDTO>(showTimeService.updateShowTime(showTimeDTO, idMovie, idTheater, idShowTime),
                HttpStatus.OK);
    }

    @GetMapping("")
    public ResponseEntity<?> getAllShowTimes() {

        return new ResponseEntity<List<ShowTimeDTO>>(showTimeService.getAllShowTime(), HttpStatus.OK);
    }

    @GetMapping("/{id}")
    public ResponseEntity<?> getShowTimeById(@PathVariable int id) {
        return new ResponseEntity<ShowTimeDTO>(showTimeService.getShowTimeById(id), HttpStatus.OK);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteShowTime(@PathVariable int id) {
        showTimeService.deleteShowTime(id);
        return new ResponseEntity<ApiRespone>(new ApiRespone(new Date().toLocaleString(), "Show time was deleted with id: " + id, true), HttpStatus.OK);
    }

    @DeleteMapping("/force/{id}")
    public ResponseEntity<?> deleteShowTimeForce(@PathVariable int id) {
        showTimeService.deleteShowTimeForce(id);
        return new ResponseEntity<ApiRespone>(new ApiRespone(new Date().toLocaleString(), "Show time was force-deleted with id: " + id, true), HttpStatus.OK);
    }

    @PutMapping("/{idShowTime}")
    public ResponseEntity<?> updateShowTimes(@Valid @RequestBody ShowTimeDTO showTimeDTO, @PathVariable int idShowTime, @RequestParam(value = "movies", required = true) Integer idMovie, @RequestParam(value = "theaters", required = true) Integer idTheater) {
        if (idMovie != null && idTheater != null)
            return new ResponseEntity<ShowTimeDTO>(showTimeService.updateShowTime(showTimeDTO, idMovie, idTheater, idShowTime), HttpStatus.OK);
        else
            return new ResponseEntity<ApiRespone>(new ApiRespone(new Date().toLocaleString(), "please enter movie and theater", false), HttpStatus.BAD_REQUEST);
    }
}
