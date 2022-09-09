package springboot.restful.config;

import java.text.DateFormat;
import java.text.SimpleDateFormat;

public class AppConstant {
	public static final int ROLE_ADMIN = 501;
	public static final int ROLE_USER = 502;

	public static final DateFormat DATE_FORMAT = new SimpleDateFormat("dd/MM/yyyy");
	public static final DateFormat TIME_FORMAT = new SimpleDateFormat("HH:mm:ss");
	public static final DateFormat DATE_TIME_FORMAT = new SimpleDateFormat("dd/MM/yyyy HH:mm:ss");
}
