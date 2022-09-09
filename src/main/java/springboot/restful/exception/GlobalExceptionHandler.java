package springboot.restful.exception;

import java.sql.SQLIntegrityConstraintViolationException;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.http.converter.HttpMessageNotReadableException;
import org.springframework.validation.FieldError;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestControllerAdvice;

@RestControllerAdvice
public class GlobalExceptionHandler {

	@Autowired
	private HttpServletRequest request;

	@ExceptionHandler(ResourceNotFoundException.class)
	public ResponseEntity<?> resourceNotFoundExceptionHandler(ResourceNotFoundException ex) {
		String message = ex.getMessage();
		ErrorDetails errorDetails = new ErrorDetails(new Date().toLocaleString(), HttpStatus.NOT_FOUND.toString(),
				message, request.getRequestURI(), request.getMethod());
		return new ResponseEntity<ErrorDetails>(errorDetails, HttpStatus.NOT_FOUND);
	}

	@ExceptionHandler(MethodArgumentNotValidException.class)
	public ResponseEntity<?> handleMethodArgsNotValidException(MethodArgumentNotValidException ex) {
		Map<String, String> respone = new HashMap<>();

		ex.getBindingResult().getAllErrors().forEach((erorr) -> {
			String fieldName = ((FieldError) erorr).getField();
			String message = erorr.getDefaultMessage();
			respone.put(fieldName, message);
		});
		return new ResponseEntity<Map<String, String>>(respone, HttpStatus.BAD_REQUEST);
	}

	@ExceptionHandler(SQLIntegrityConstraintViolationException.class)
	@ResponseStatus(value = HttpStatus.BAD_REQUEST)
	public ResponseEntity<?> handleSQLIntegrityConstraintViolationException(
			SQLIntegrityConstraintViolationException ex) {

		String message = ex.getCause() == null ? ex.getMessage() : ex.getCause().getLocalizedMessage();
		String mess = message.substring(0, message.indexOf("user.UK_"));

		if (message.contains("@"))// email
			mess += "email'. Please enter another email";
		else // phone number
			mess += "phoneNumber'. Please enter another phone number";

		ErrorDetails errorDetails = new ErrorDetails(new Date().toLocaleString(), HttpStatus.BAD_REQUEST.toString(),
				mess, request.getRequestURI(), request.getMethod());
		return new ResponseEntity<ErrorDetails>(errorDetails, HttpStatus.BAD_REQUEST);

	}

	@ExceptionHandler(HttpMessageNotReadableException.class)
	public ResponseEntity<?> handleHttpMessageNotReadableException(HttpMessageNotReadableException ex) {
		return new ResponseEntity<ErrorDetails>(
				new ErrorDetails(new Date().toLocaleString(), HttpStatus.BAD_REQUEST.toString(),
						ex.getLocalizedMessage(), request.getRequestURI(), request.getMethod()),
				HttpStatus.BAD_REQUEST);
	}

	@ExceptionHandler(ApiException.class)
	public ResponseEntity<?> handleApiException(ApiException ex) {
		return new ResponseEntity<ApiRespone>(new ApiRespone(new Date().toLocaleString(), ex.getMessage(), false),
				HttpStatus.NOT_ACCEPTABLE);
	}
}
