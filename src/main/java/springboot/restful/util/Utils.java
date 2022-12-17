package springboot.restful.util;

import com.google.zxing.BarcodeFormat;
import com.google.zxing.MultiFormatWriter;
import com.google.zxing.WriterException;
import com.google.zxing.client.j2se.MatrixToImageWriter;
import com.google.zxing.common.BitMatrix;

import javax.mail.MessagingException;
import javax.servlet.http.HttpServletRequest;
import java.io.IOException;
import java.nio.file.Paths;
import java.text.DateFormatSymbols;
import java.text.SimpleDateFormat;
import java.util.Date;

public class Utils {

	public static String getBaseURL(HttpServletRequest request) {
		String scheme = request.getScheme();
		String serverName = request.getServerName();
		int serverPort = request.getServerPort();
		String contextPath = request.getContextPath();
		StringBuffer url = new StringBuffer();
		url.append(scheme).append("://").append(serverName);
		if ((serverPort != 80) && (serverPort != 443)) {
			url.append(":").append(serverPort);
		}
		url.append(contextPath);
		if (url.toString().endsWith("/")) {
			url.append("/");
		}
		return url.toString();
	}

	public static String getDayOfMonthSuffix(final int n) {
		String result = "";
		if (n >= 11 && n <= 13) {
			result = "th";
		}
		switch (n % 10) {
			case 1:
				result = "st";
			case 2:
				result = "nd";
			case 3:
				result = "rd";
			default:
				result = "th";
		}
		return result.toUpperCase();
	}

	public static String getNameOfMonth(int month) {
		return new DateFormatSymbols().getMonths()[month].toUpperCase();
	}

	public static String getNameOfDay(Date date) {
		SimpleDateFormat format = new SimpleDateFormat("EEEE");
		return format.format(date).toUpperCase();
	}


	public static void generateCode(String data, String path, String charset, int h, int w) throws WriterException, IOException, MessagingException {
		BitMatrix bitMatrix = new MultiFormatWriter().encode(data, BarcodeFormat.QR_CODE, w, h);
		MatrixToImageWriter.writeToPath(bitMatrix, path.substring(path.lastIndexOf('.') + 1), Paths.get(path));
	}
}
