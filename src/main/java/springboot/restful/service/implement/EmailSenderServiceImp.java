package springboot.restful.service.implement;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Service;
import springboot.restful.model.payloads.TicketDTO;
import springboot.restful.service.EmailSenderService;
import springboot.restful.util.Utils;

import javax.mail.MessagingException;
import javax.mail.internet.MimeMessage;
import java.util.Date;
import java.util.List;


@Service
public class EmailSenderServiceImp implements EmailSenderService {

	@Autowired
	private JavaMailSender mailSender;

	@Value("${spring.mail.username}")
	private String fromEmail;


	@Override
	public void sendEmail(String toEmail, String subject, String body) throws MessagingException {

		MimeMessage mess = mailSender.createMimeMessage();
		MimeMessageHelper helper = new MimeMessageHelper(mess, "utf-8");
		helper.setText(body, true);
		helper.setTo(toEmail);
		helper.setFrom(fromEmail);
		helper.setSubject(subject);
		helper.setSentDate(new Date());
//        SimpleMailMessage message = new SimpleMailMessage();
//        message.setFrom(fromEmail);
//        message.setTo(toEmail);
//        message.setSubject(subject);
//        message.setText(body);
		mailSender.send(mess);
//        mailSender.send(message);

		System.out.println("Mail was sent successfully");
	}

	@Override
	public String htmlEmailVerificationCodeRegister(String code, String name) {


		String html = "<!DOCTYPE html>\n" +
				"<html>\n" +
				"\n" +
				"<head>\n" +
				"    <title></title>\n" +
				"    <meta http-equiv=\"Content-Type\" content=\"text/html; charset=utf-8\" />\n" +
				"    <meta name=\"viewport\" content=\"width=device-width, initial-scale=1\">\n" +
				"    <meta http-equiv=\"X-UA-Compatible\" content=\"IE=edge\" />\n" +
				"    <style type=\"text/css\">\n" +
				"        @media screen {\n" +
				"            @font-face {\n" +
				"                font-family: 'Lato';\n" +
				"                font-style: normal;\n" +
				"                font-weight: 400;\n" +
				"                src: local('Lato Regular'), local('Lato-Regular'), url(https://fonts.gstatic.com/s/lato/v11/qIIYRU-oROkIk8vfvxw6QvesZW2xOQ-xsNqO47m55DA.woff) format('woff');\n" +
				"            }\n" +
				"\n" +
				"            @font-face {\n" +
				"                font-family: 'Lato';\n" +
				"                font-style: normal;\n" +
				"                font-weight: 700;\n" +
				"                src: local('Lato Bold'), local('Lato-Bold'), url(https://fonts.gstatic.com/s/lato/v11/qdgUG4U09HnJwhYI-uK18wLUuEpTyoUstqEm5AMlJo4.woff) format('woff');\n" +
				"            }\n" +
				"\n" +
				"            @font-face {\n" +
				"                font-family: 'Lato';\n" +
				"                font-style: italic;\n" +
				"                font-weight: 400;\n" +
				"                src: local('Lato Italic'), local('Lato-Italic'), url(https://fonts.gstatic.com/s/lato/v11/RYyZNoeFgb0l7W3Vu1aSWOvvDin1pK8aKteLpeZ5c0A.woff) format('woff');\n" +
				"            }\n" +
				"\n" +
				"            @font-face {\n" +
				"                font-family: 'Lato';\n" +
				"                font-style: italic;\n" +
				"                font-weight: 700;\n" +
				"                src: local('Lato Bold Italic'), local('Lato-BoldItalic'), url(https://fonts.gstatic.com/s/lato/v11/HkF_qI1x_noxlxhrhMQYELO3LdcAZYWl9Si6vvxL-qU.woff) format('woff');\n" +
				"            }\n" +
				"        }\n" +
				"\n" +
				"        /* CLIENT-SPECIFIC STYLES */\n" +
				"        body,\n" +
				"        table,\n" +
				"        td,\n" +
				"        a {\n" +
				"            -webkit-text-size-adjust: 100%;\n" +
				"            -ms-text-size-adjust: 100%;\n" +
				"        }\n" +
				"\n" +
				"        table,\n" +
				"        td {\n" +
				"            mso-table-lspace: 0pt;\n" +
				"            mso-table-rspace: 0pt;\n" +
				"        }\n" +
				"\n" +
				"        img {\n" +
				"            -ms-interpolation-mode: bicubic;\n" +
				"        }\n" +
				"\n" +
				"        /* RESET STYLES */\n" +
				"        img {\n" +
				"            border: 0;\n" +
				"            height: auto;\n" +
				"            line-height: 100%;\n" +
				"            outline: none;\n" +
				"            text-decoration: none;\n" +
				"        }\n" +
				"\n" +
				"        table {\n" +
				"            border-collapse: collapse !important;\n" +
				"        }\n" +
				"\n" +
				"        body {\n" +
				"            height: 100% !important;\n" +
				"            margin: 0 !important;\n" +
				"            padding: 0 !important;\n" +
				"            width: 100% !important;\n" +
				"        }\n" +
				"\n" +
				"        /* iOS BLUE LINKS */\n" +
				"        a[x-apple-data-detectors] {\n" +
				"            color: inherit !important;\n" +
				"            text-decoration: none !important;\n" +
				"            font-size: inherit !important;\n" +
				"            font-family: inherit !important;\n" +
				"            font-weight: inherit !important;\n" +
				"            line-height: inherit !important;\n" +
				"        }\n" +
				"\n" +
				"        /* MOBILE STYLES */\n" +
				"        @media screen and (max-width:600px) {\n" +
				"            h1 {\n" +
				"                font-size: 32px !important;\n" +
				"                line-height: 32px !important;\n" +
				"            }\n" +
				"        }\n" +
				"\n" +
				"        /* ANDROID CENTER FIX */\n" +
				"        div[style*=\"margin: 16px 0;\"] {\n" +
				"            margin: 0 !important;\n" +
				"        }\n" +
				"    </style>\n" +
				"</head>\n" +
				"\n" +
				"<body style=\"background-color: #f4f4f4; margin: 0 !important; padding: 0 !important;\">\n" +
				"    <!-- HIDDEN PREHEADER TEXT -->\n" +
//                "    <div style=\"display: none; font-size: 1px; color: #fefefe; line-height: 1px; font-family: 'Lato', Helvetica, Arial, sans-serif; max-height: 0px; max-width: 0px; opacity: 0; overflow: hidden;\"> We're thrilled to have you here! Get ready to dive into your new account.\n" +
//                "    </div>\n" +
				"    <table border=\"0\" cellpadding=\"0\" cellspacing=\"0\" width=\"100%\">\n" +
				"        <!-- LOGO -->\n" +
				"        <tr>\n" +
				"            <td bgcolor=\"#FFA73B\" align=\"center\">\n" +
				"                <table border=\"0\" cellpadding=\"0\" cellspacing=\"0\" width=\"100%\" style=\"max-width: 600px;\">\n" +
				"                    <tr>\n" +
				"                        <td align=\"center\" valign=\"top\" style=\"padding: 40px 10px 40px 10px;\"> </td>\n" +
				"                    </tr>\n" +
				"                </table>\n" +
				"            </td>\n" +
				"        </tr>\n" +
				"        <tr>\n" +
				"            <td bgcolor=\"#FFA73B\" align=\"center\" style=\"padding: 0px 10px 0px 10px;\">\n" +
				"                <table border=\"0\" cellpadding=\"0\" cellspacing=\"0\" width=\"100%\" style=\"max-width: 600px;\">\n" +
				"                    <tr>\n" +
				"                        <td bgcolor=\"#ffffff\" align=\"center\" valign=\"top\" style=\"padding: 40px 20px 20px 20px; border-radius: 4px 4px 0px 0px; color: #111111; font-family: 'Lato', Helvetica, Arial, sans-serif; font-size: 48px; font-weight: 400; letter-spacing: 4px; line-height: 48px;\">\n" +
				"                            <h1 style=\"font-size: 48px; font-weight: 400; margin: 2;\">Welcome!</h1> <img src=\" https://img.icons8.com/clouds/100/000000/handshake.png\" width=\"125\" height=\"120\" style=\"display: block; border: 0px;\" />\n" +
				"                        </td>\n" +
				"                    </tr>\n" +
				"                </table>\n" +
				"            </td>\n" +
				"        </tr>\n" +
				"        <tr>\n" +
				"            <td bgcolor=\"#f4f4f4\" align=\"center\" style=\"padding: 0px 10px 0px 10px;\">\n" +
				"                <table border=\"0\" cellpadding=\"0\" cellspacing=\"0\" width=\"100%\" style=\"max-width: 600px;\">\n" +
				"                    <tr>\n" +
				"                        <td bgcolor=\"#ffffff\" align=\"left\" style=\"padding: 20px 30px 40px 30px; color: #666666; font-family: 'Lato', Helvetica, Arial, sans-serif; font-size: 18px; font-weight: 400; line-height: 25px;\">\n" +
				"                            <p style=\"margin: 0;\">Hi " + name + ",</p>\n" +
				"                          <p>Thanks for signing up, your verification code here:</p>\n" +
				"                        </td>\n" +
				"                    </tr>\n" +
				"                    <tr>\n" +
				"                        <td bgcolor=\"#ffffff\" align=\"left\">\n" +
				"                            <table width=\"100%\" border=\"0\" cellspacing=\"0\" cellpadding=\"0\">\n" +
				"                                <tr>\n" +
				"                                    <td bgcolor=\"#ffffff\" align=\"center\" style=\"padding: 20px 30px 60px 30px;\">\n" +
				"                                        <table border=\"0\" cellspacing=\"0\" cellpadding=\"0\">\n" +
				"                                            <tr>\n" +
				"                                                <td align=\"center\" style=\"border-radius: 3px;\" bgcolor=\"#FFA73B\"><div target=\"_blank\" style=\"font-size: 20px; font-family: Helvetica, Arial, sans-serif; color: #ffffff; text-decoration: none; color: #ffffff; text-decoration: none; padding: 15px 25px; border-radius: 2px; border: 1px solid #FFA73B; display: inline-block; letter-spacing: 10px; font-size: 50px;\">" + code + "</div></td>\n" +
				"                                            </tr>\n" +
				"                                        </table>\n" +
				"                                    </td>\n" +
				"                                </tr>\n" +
				"                            </table>\n" +
				"                        </td>\n" +
				"                    </tr> <!-- COPY -->\n" +
				"                    <tr>\n" +
				"                        <td bgcolor=\"#ffffff\" align=\"left\" style=\"padding: 0px 30px 0px 30px; color: #666666; font-family: 'Lato', Helvetica, Arial, sans-serif; font-size: 18px; font-weight: 400; line-height: 25px;\">\n" +
				"                            <p style=\"margin: 0;\">Please return to UTE Cinema website and enter your code to complete the process</p>\n" +
				"                        </td>\n" +
				"                    </tr> <!-- COPY -->\n" +
				"                    \n" +
				"                    <tr>\n" +
				"                        <td bgcolor=\"#ffffff\" align=\"left\" style=\"padding: 0px 30px 20px 30px; color: #666666; font-family: 'Lato', Helvetica, Arial, sans-serif; font-size: 18px; font-weight: 400; line-height: 25px;\">\n" +
				"                            <p style=\"margin-top: 20px;\">If you have any questions, just reply to this email&mdash;we're always happy to help out.</p>\n" +
				"                        </td>\n" +
				"                    </tr>\n" +
				"                    <tr>\n" +
				"                        <td bgcolor=\"#ffffff\" align=\"left\" style=\"padding: 0px 30px 40px 30px; border-radius: 0px 0px 4px 4px; color: #666666; font-family: 'Lato', Helvetica, Arial, sans-serif; font-size: 18px; font-weight: 400; line-height: 25px;\">\n" +
				"                          <p style=\"margin: 0;\">Cheers,</p>\n" +
				"                          \n" +
				"                          <h3 style=\"margin-top:10px;\">The UTE Cinema Team</h3>\n" +
				"                        </td>\n" +
				"                    </tr>\n" +
				"                </table>\n" +
				"            </td>\n" +
				"        </tr>\n" +
				"                         \n" +
				"    </table>\n" +
				"</body>\n" +
				"\n" +
				"</html>";

		return html;
	}

	@Override
	public String htmlEmailVerificationCodeForgotPassword(String code, String name) {

		String html = "<!DOCTYPE html>\n" +
				"<html>\n" +
				"\n" +
				"<head>\n" +
				"    <title></title>\n" +
				"    <meta http-equiv=\"Content-Type\" content=\"text/html; charset=utf-8\" />\n" +
				"    <meta name=\"viewport\" content=\"width=device-width, initial-scale=1\">\n" +
				"    <meta http-equiv=\"X-UA-Compatible\" content=\"IE=edge\" />\n" +
				"    <style type=\"text/css\">\n" +
				"        @media screen {\n" +
				"            @font-face {\n" +
				"                font-family: 'Lato';\n" +
				"                font-style: normal;\n" +
				"                font-weight: 400;\n" +
				"                src: local('Lato Regular'), local('Lato-Regular'), url(https://fonts.gstatic.com/s/lato/v11/qIIYRU-oROkIk8vfvxw6QvesZW2xOQ-xsNqO47m55DA.woff) format('woff');\n" +
				"            }\n" +
				"\n" +
				"            @font-face {\n" +
				"                font-family: 'Lato';\n" +
				"                font-style: normal;\n" +
				"                font-weight: 700;\n" +
				"                src: local('Lato Bold'), local('Lato-Bold'), url(https://fonts.gstatic.com/s/lato/v11/qdgUG4U09HnJwhYI-uK18wLUuEpTyoUstqEm5AMlJo4.woff) format('woff');\n" +
				"            }\n" +
				"\n" +
				"            @font-face {\n" +
				"                font-family: 'Lato';\n" +
				"                font-style: italic;\n" +
				"                font-weight: 400;\n" +
				"                src: local('Lato Italic'), local('Lato-Italic'), url(https://fonts.gstatic.com/s/lato/v11/RYyZNoeFgb0l7W3Vu1aSWOvvDin1pK8aKteLpeZ5c0A.woff) format('woff');\n" +
				"            }\n" +
				"\n" +
				"            @font-face {\n" +
				"                font-family: 'Lato';\n" +
				"                font-style: italic;\n" +
				"                font-weight: 700;\n" +
				"                src: local('Lato Bold Italic'), local('Lato-BoldItalic'), url(https://fonts.gstatic.com/s/lato/v11/HkF_qI1x_noxlxhrhMQYELO3LdcAZYWl9Si6vvxL-qU.woff) format('woff');\n" +
				"            }\n" +
				"        }\n" +
				"\n" +
				"        /* CLIENT-SPECIFIC STYLES */\n" +
				"        body,\n" +
				"        table,\n" +
				"        td,\n" +
				"        a {\n" +
				"            -webkit-text-size-adjust: 100%;\n" +
				"            -ms-text-size-adjust: 100%;\n" +
				"        }\n" +
				"\n" +
				"        table,\n" +
				"        td {\n" +
				"            mso-table-lspace: 0pt;\n" +
				"            mso-table-rspace: 0pt;\n" +
				"        }\n" +
				"\n" +
				"        img {\n" +
				"            -ms-interpolation-mode: bicubic;\n" +
				"        }\n" +
				"\n" +
				"        /* RESET STYLES */\n" +
				"        img {\n" +
				"            border: 0;\n" +
				"            height: auto;\n" +
				"            line-height: 100%;\n" +
				"            outline: none;\n" +
				"            text-decoration: none;\n" +
				"        }\n" +
				"\n" +
				"        table {\n" +
				"            border-collapse: collapse !important;\n" +
				"        }\n" +
				"\n" +
				"        body {\n" +
				"            height: 100% !important;\n" +
				"            margin: 0 !important;\n" +
				"            padding: 0 !important;\n" +
				"            width: 100% !important;\n" +
				"        }\n" +
				"\n" +
				"        /* iOS BLUE LINKS */\n" +
				"        a[x-apple-data-detectors] {\n" +
				"            color: inherit !important;\n" +
				"            text-decoration: none !important;\n" +
				"            font-size: inherit !important;\n" +
				"            font-family: inherit !important;\n" +
				"            font-weight: inherit !important;\n" +
				"            line-height: inherit !important;\n" +
				"        }\n" +
				"\n" +
				"        /* MOBILE STYLES */\n" +
				"        @media screen and (max-width:600px) {\n" +
				"            h1 {\n" +
				"                font-size: 32px !important;\n" +
				"                line-height: 32px !important;\n" +
				"            }\n" +
				"        }\n" +
				"\n" +
				"        /* ANDROID CENTER FIX */\n" +
				"        div[style*=\"margin: 16px 0;\"] {\n" +
				"            margin: 0 !important;\n" +
				"        }\n" +
				"    </style>\n" +
				"</head>\n" +
				"\n" +
				"<body style=\"background-color: #f4f4f4; margin: 0 !important; padding: 0 !important;\">\n" +
				"    <!-- HIDDEN PREHEADER TEXT -->\n" +
//                "    <div style=\"display: none; font-size: 1px; color: #fefefe; line-height: 1px; font-family: 'Lato', Helvetica, Arial, sans-serif; max-height: 0px; max-width: 0px; opacity: 0; overflow: hidden;\"> We're thrilled to have you here! Get ready to dive into your new account.\n" +
//                "    </div>\n" +
				"    <table border=\"0\" cellpadding=\"0\" cellspacing=\"0\" width=\"100%\">\n" +
				"        <!-- LOGO -->\n" +
				"        <tr>\n" +
				"            <td bgcolor=\"#FFA73B\" align=\"center\">\n" +
				"                <table border=\"0\" cellpadding=\"0\" cellspacing=\"0\" width=\"100%\" style=\"max-width: 600px;\">\n" +
				"                    <tr>\n" +
				"                        <td align=\"center\" valign=\"top\" style=\"padding: 40px 10px 40px 10px;\"> </td>\n" +
				"                    </tr>\n" +
				"                </table>\n" +
				"            </td>\n" +
				"        </tr>\n" +
				"        <tr>\n" +
				"            <td bgcolor=\"#FFA73B\" align=\"center\" style=\"padding: 0px 10px 0px 10px;\">\n" +
				"                <table border=\"0\" cellpadding=\"0\" cellspacing=\"0\" width=\"100%\" style=\"max-width: 600px;\">\n" +
				"                    <tr>\n" +
				"                        <td bgcolor=\"#ffffff\" align=\"center\" valign=\"top\" style=\"padding: 40px 20px 20px 20px; border-radius: 4px 4px 0px 0px; color: #111111; font-family: 'Lato', Helvetica, Arial, sans-serif; font-size: 48px; font-weight: 400; letter-spacing: 4px; line-height: 48px;\">\n" +
				"                            <h1 style=\"font-size: 48px; font-weight: 400; margin: 2;\">Welcome!</h1> <img src=\" https://img.icons8.com/clouds/100/000000/handshake.png\" width=\"125\" height=\"120\" style=\"display: block; border: 0px;\" />\n" +
				"                        </td>\n" +
				"                    </tr>\n" +
				"                </table>\n" +
				"            </td>\n" +
				"        </tr>\n" +
				"        <tr>\n" +
				"            <td bgcolor=\"#f4f4f4\" align=\"center\" style=\"padding: 0px 10px 0px 10px;\">\n" +
				"                <table border=\"0\" cellpadding=\"0\" cellspacing=\"0\" width=\"100%\" style=\"max-width: 600px;\">\n" +
				"                    <tr>\n" +
				"                        <td bgcolor=\"#ffffff\" align=\"left\" style=\"padding: 20px 30px 40px 30px; color: #666666; font-family: 'Lato', Helvetica, Arial, sans-serif; font-size: 18px; font-weight: 400; line-height: 25px;\">\n" +
				"                            <p style=\"margin: 0;\">Hi " + name + ",</p>\n" +
				"                          <p>Here your verification code below to reset your password:</p>\n" +
				"                        </td>\n" +
				"                    </tr>\n" +
				"                    <tr>\n" +
				"                        <td bgcolor=\"#ffffff\" align=\"left\">\n" +
				"                            <table width=\"100%\" border=\"0\" cellspacing=\"0\" cellpadding=\"0\">\n" +
				"                                <tr>\n" +
				"                                    <td bgcolor=\"#ffffff\" align=\"center\" style=\"padding: 20px 30px 60px 30px;\">\n" +
				"                                        <table border=\"0\" cellspacing=\"0\" cellpadding=\"0\">\n" +
				"                                            <tr>\n" +
				"                                                <td align=\"center\" style=\"border-radius: 3px;\" bgcolor=\"#FFA73B\"><div target=\"_blank\" style=\"font-size: 20px; font-family: Helvetica, Arial, sans-serif; color: #ffffff; text-decoration: none; color: #ffffff; text-decoration: none; padding: 15px 25px; border-radius: 2px; border: 1px solid #FFA73B; display: inline-block; letter-spacing: 10px; font-size: 50px;\">" + code + "</div></td>\n" +
				"                                            </tr>\n" +
				"                                        </table>\n" +
				"                                    </td>\n" +
				"                                </tr>\n" +
				"                            </table>\n" +
				"                        </td>\n" +
				"                    </tr> <!-- COPY -->\n" +
				"                    <tr>\n" +
				"                        <td bgcolor=\"#ffffff\" align=\"left\" style=\"padding: 0px 30px 0px 30px; color: #666666; font-family: 'Lato', Helvetica, Arial, sans-serif; font-size: 18px; font-weight: 400; line-height: 25px;\">\n" +
				"                            <p style=\"margin: 0;\">Please return to UTE Cinema website and enter your code to complete the process</p>\n" +
				"                        </td>\n" +
				"                    </tr> <!-- COPY -->\n" +
				"                    \n" +
				"                    <tr>\n" +
				"                        <td bgcolor=\"#ffffff\" align=\"left\" style=\"padding: 0px 30px 20px 30px; color: #666666; font-family: 'Lato', Helvetica, Arial, sans-serif; font-size: 18px; font-weight: 400; line-height: 25px;\">\n" +
				"                            <p style=\"margin-top: 20px;\">If you have any questions, just reply to this email&mdash;we're always happy to help out.</p>\n" +
				"                        </td>\n" +
				"                    </tr>\n" +
				"                    <tr>\n" +
				"                        <td bgcolor=\"#ffffff\" align=\"left\" style=\"padding: 0px 30px 40px 30px; border-radius: 0px 0px 4px 4px; color: #666666; font-family: 'Lato', Helvetica, Arial, sans-serif; font-size: 18px; font-weight: 400; line-height: 25px;\">\n" +
				"                          <p style=\"margin: 0;\">Cheers,</p>\n" +
				"                          \n" +
				"                          <h3 style=\"margin-top:10px;\">The UTE Cinema Team</h3>\n" +
				"                        </td>\n" +
				"                    </tr>\n" +
				"                </table>\n" +
				"            </td>\n" +
				"        </tr>\n" +
				"                         \n" +
				"    </table>\n" +
				"</body>\n" +
				"\n" +
				"</html>";

		return html;
	}

	@Override
	public String htmlEmailResetPassword(String password) {
		return "<html><body>" +
				"<h1>New password</h1>" +
				"<h2>Your new password bellow:</h2>" +
				"<h3>" + password + "</h3>" +
				"<p>PLEASE DO NOT SHARE PASSWORD WITH ANYBODY</p>" +
				"<p>PLEASE CHANGE PASSWORD AF SINGING IN</p>" +
				"</body></html>";
	}

	@Override
	public String htmlGenerateTicket(List<TicketDTO> ticketDTO) {

//		Date showDate = ticketDTO.getShowTime().getShowDate();
//		String timeStart = ticketDTO.getShowTime().getTimeStart();
//		String timeEnd = ticketDTO.getShowTime().getTimeEnd();
//		String theater = ticketDTO.getShowTime().getTheater().getName();
//		String movie = ticketDTO.getShowTime().getMovie().getName();
//		String seat = ticketDTO.getSeat().getName();
//		int year = showDate.getYear();
//		String EEEE = Utils.getNameOfDay(showDate);
//		String month = Utils.getNameOfMonth(showDate.getMonth());
//		String date = showDate.getDate() + Utils.getDayOfMonthSuffix(showDate.getDate());
//

		String template1 = "<!DOCTYPE html>\n" +
				"<html lang=\"en\">\n" +
				"\n" +
				"<head>\n" +
				"    <meta charset=\"UTF-8\">\n" +
				"    <meta http-equiv=\"X-UA-Compatible\" content=\"IE=edge\">\n" +
				"    <meta name=\"viewport\" content=\"width=device-width, initial-scale=1.0\">\n" +
				"    <link rel=\"stylesheet\"\n" +
				"        href=\"https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.3/css/all.min.css\" />\n" +
				"    <title>Document</title>\n" +
				"</head>\n" +
				"\n" +
				"<body>\n" +
				"\n" +
				"    <style>\n" +
				"        @import url(\"https://fonts.googleapis.com/css2?family=Staatliches&display=swap\");\n" +
				"        @import url(\"https://fonts.googleapis.com/css2?family=Nanum+Pen+Script&display=swap\");\n" +
				"\n" +
				"        * {\n" +
				"            margin: 0;\n" +
				"            padding: 0;\n" +
				"            box-sizing: border-box;\n" +
				"        }\n" +
				"\n" +
				"        body,\n" +
				"        html {\n" +
				"            height: 100vh;\n" +
				"            display: grid;\n" +
				"            font-family: \"Staatliches\", cursive;\n" +
				"            /* background: #c153eca5; */\n" +
				"            color: black;\n" +
				"            font-size: 14px;\n" +
				"            letter-spacing: 0.1em;\n" +
				"        }\n" +
				"\n" +
				"        .ticket {\n" +
				"            margin: auto;\n" +
				"            display: flex;\n" +
				"            background: rgb(229, 240, 245);\n" +
				"            box-shadow: rgba(0, 0, 0, 0.3) 0px 19px 38px, rgba(0, 0, 0, 0.22) 0px 15px 12px;\n" +
				"        }\n" +
				"\n" +
				"        .left {\n" +
				"            display: flex;\n" +
				"        }\n" +
				"\n" +
				"\n" +
				"        .admit-one {\n" +
				"            position: absolute;\n" +
				"            color: darkgray;\n" +
				"            height: 250px;\n" +
				"            padding: 0 10px;\n" +
				"            letter-spacing: 0.15em;\n" +
				"            display: flex;\n" +
				"            text-align: center;\n" +
				"            justify-content: space-around;\n" +
				"            writing-mode: vertical-rl;\n" +
				"            transform: rotate(-180deg);\n" +
				"        }\n" +
				"\n" +
				"        .admit-one span:nth-child(2) {\n" +
				"            color: white;\n" +
				"            font-weight: 700;\n" +
				"        }\n" +
				"\n" +
				"\n" +
				"        .ticket-info {\n" +
				"            padding: 10px 30px;\n" +
				"            display: flex;\n" +
				"            flex-direction: column;\n" +
				"            text-align: center;\n" +
				"            justify-content: space-between;\n" +
				"            align-items: center;\n" +
				"        }\n" +
				"\n" +
				"        .date {\n" +
				"            border-top: 1px solid gray;\n" +
				"            border-bottom: 1px solid gray;\n" +
				"            padding: 5px 0;\n" +
				"            font-weight: 700;\n" +
				"            display: flex;\n" +
				"            align-items: center;\n" +
				"            justify-content: space-around;\n" +
				"        }\n" +
				"\n" +
				"        .date span {\n" +
				"            width: 100px;\n" +
				"            font-size: 16px;\n" +
				"        }\n" +
				"\n" +
				"        .date span:first-child {\n" +
				"            text-align: left;\n" +
				"            font-size: 16px;\n" +
				"        }\n" +
				"\n" +
				"        .date span:last-child {\n" +
				"            text-align: right;\n" +
				"        }\n" +
				"\n" +
				"        .date .showDate {\n" +
				"            color: #d83565;\n" +
				"            font-size: 20px;\n" +
				"        }\n" +
				"\n" +
				"        .show-name {\n" +
				"            font-size: 32px;\n" +
				"            font-family: \"Nanum Pen Script\", cursive;\n" +
				"            color: #d83565;\n" +
				"        }\n" +
				"\n" +
				"        .show-name h1 {\n" +
				"            font-size: 48px;\n" +
				"            font-weight: 700;\n" +
				"            letter-spacing: 0.1em;\n" +
				"            color: #4a437e;\n" +
				"        }\n" +
				"\n" +
				"        .time {\n" +
				"            padding: 10px 0;\n" +
				"            color: #4a437e;\n" +
				"            text-align: center;\n" +
				"            display: flex;\n" +
				"            flex-direction: column;\n" +
				"            gap: 10px;\n" +
				"            font-weight: 700;\n" +
				"        }\n" +
				"\n" +
				"        .time span {\n" +
				"            font-weight: 400;\n" +
				"            color: gray;\n" +
				"        }\n" +
				"\n" +
				"        /* .left .time {\n" +
				"\tfont-size: 16px;\n" +
				"}\n" +
				" */\n" +
				"\n" +
				"        .location {\n" +
				"            display: flex;\n" +
				"            justify-content: space-around;\n" +
				"            align-items: center;\n" +
				"            width: 100%;\n" +
				"            padding-top: 8px;\n" +
				"            border-top: 2px solid gray;\n" +
				"        }\n" +
				"\n" +
				"        .location .separator {\n" +
				"            font-size: 20px;\n" +
				"        }\n" +
				"\n" +
				"        .right {\n" +
				"            width: 180px;\n" +
				"            border-left: 2px dashed #404040;\n" +
				"        }\n" +
				"\n" +
				"        .right .admit-one {\n" +
				"            color: darkgray;\n" +
				"        }\n" +
				"\n" +
				"        .right .admit-one span:nth-child(2) {\n" +
				"            color: gray;\n" +
				"        }\n" +
				"\n" +
				"        .right .right-info-container {\n" +
				"            height: 250px;\n" +
				"            padding: 10px 10px 10px 35px;\n" +
				"            display: flex;\n" +
				"            flex-direction: column;\n" +
				"            justify-content: space-around;\n" +
				"            align-items: center;\n" +
				"        }\n" +
				"\n" +
				"        .right .show-name h1 {\n" +
				"            font-size: 18px;\n" +
				"        }\n" +
				"\n" +
				"        .barcode {\n" +
				"            height: 100px;\n" +
				"        }\n" +
				"\n" +
				"        .barcode img {\n" +
				"            height: 100%;\n" +
				"        }\n" +
				"\n" +
				"        .right .ticket-number {\n" +
				"            color: gray;\n" +
				"        }\n" +
				"    </style>\n" +
				"\n" +
				"    <div class=\"ticket\">\n" +
				"        <div class=\"left\">\n" +
				"            <div class=\"ticket-info\">\n" +
				"                <p class=\"date\">\n" +
				"                    <span>TUESDAY</span>\n" +
				"                    <span class=\"showDate\">JUNE 29TH</span>\n" +
				"                    <span>2021</span>\n" +
				"                </p>\n" +
				"                <div class=\"show-name\">\n" +
				"                    <h1>SOUR Prom</h1>\n" +
				"                    <h2>Olivia Rodrigo</h2>\n" +
				"                </div>\n" +
				"                <div class=\"time\">\n" +
				"                    <p style=\"font-size:20px;\">8:00 PM <span>TO</span> 11:00 PM</p>\n" +
				"                </div>\n" +
				"                <p class=\"location\" style=\"font-size:20px;\"><span>UTE CINEMA</span>\n" +
				"                    <span class=\"separator\"><i class=\"far fa-smile\"></i></span><span>SCREEN 1</span>\n" +
				"                </p>\n" +
				"            </div>\n" +
				"        </div>\n" +
				"        <div class=\"right\">\n" +
				"            <p class=\"admit-one\">\n" +
				"                <span>ADMIT ONE</span>\n" +
				"                <span>ADMIT ONE</span>\n" +
				"                <span>ADMIT ONE</span>\n" +
				"            </p>\n" +
				"            <div class=\"right-info-container\">\n" +
				"                <div class=\"show-name\">\n" +
				"                    <h1>Hanh phuc mau</h1>\n" +
				"                </div>\n" +
				"                <div class=\"time\">\n" +
				"                    <p>8:00 PM <span>TO</span> 11:00 PM</p>\n" +
				"                </div>\n" +
				"                <div class=\"barcode\">\n" +
				"                    <img src=\"https://external-preview.redd.it/cg8k976AV52mDvDb5jDVJABPrSZ3tpi1aXhPjgcDTbw.png?auto=webp&s=1c205ba303c1fa0370b813ea83b9e1bddb7215eb\"\n" +
				"                        alt=\"QR code\">\n" +
				"                </div>\n" +
				"            </div>\n" +
				"        </div>\n" +
				"    </div>\n" +
				"</body>\n" +
				"\n" +
				"</html>";
		String template2 = "";
		for (TicketDTO t : ticketDTO) {
			template2 += htmlGenerateBodyTicket(t);
		}
//		template += htmlGenerateBodyTicket(ticketDTO);

		String template3 = "</body>\n" +
				"</html>";

		String template = template1 + template2 + template3;
		System.out.println(template);
		return template1;
	}

	@Override
	public String htmlGenerateBodyTicket(TicketDTO ticketDTO) {

		Date showDate = ticketDTO.getShowTime().getShowDate();
		String timeStart = ticketDTO.getShowTime().getTimeStart();
		String timeEnd = ticketDTO.getShowTime().getTimeEnd();
		String theater = ticketDTO.getShowTime().getTheater().getName();
		String movie = ticketDTO.getShowTime().getMovie().getName();
		String seat = ticketDTO.getSeat().getName();
		String EEEE = Utils.getNameOfDay(showDate);
		String month = Utils.getNameOfMonth(showDate.getMonth() + 1);
		String date = showDate.getDate() + Utils.getDayOfMonthSuffix(showDate.getDate());

		String template = "<div>\n" +
				"        <div class=\"container\">\n" +
				"            <div class=\"ticket-info\">\n" +
				"                <p class=\"date\">\n" +
				"                    <span>" + EEEE + "</span>\n" +
				"                    <span class=\"showDate\">" + month + " " + date + "</span>\n" +
				"                    <span>" + showDate.toString().substring(0, 4) + "</span>\n" +
				"                </p>\n" +
				"                <div class=\"show-name\">\n" +
				"                    <h1>" + movie + "</h1>\n" +
				"                </div>\n" +
				"                <div class=\"time\">\n" +
				"                    <p>" + timeStart + "<span>TO</span>" + timeEnd + "</p>\n" +
				"                    <p class=\"seat\">SEAT: " + seat + "</p>\n" +
				"                </div>\n" +
				"                <p class=\"location\"><span>UTE CINEMA</span>\n" +
				"                    <span class=\"separator\"><i class=\"far fa-smile\"></i></span><span>" + theater + "</span>\n" +
				"                </p>\n" +
				"            </div>\n" +
				"        </div>\n" +
				"    </div>\n";

		return template;
	}


}
