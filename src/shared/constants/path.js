export const path = {
	//Register
	signIn: '/sign-in',
	signUp: '/sign-up',
	emailVerification: '/email-verify',
	forgetPassword: '/forgot-password',
	resetPassword: '/reset-password',
	//Pubic
	home: '/',
	movies: '/movies',
	detail: '/movie-detail/:id',
	profile: '/profile',
	history: '/history',
	article: '/article',
	booking: '/booking',
	bookingHistory: '/booking/history',
	order: '/order',
	payment: '/payment',
	ticketResult: '/ticket-result',
	//Admin
	dashboard: '/dashboard',
	userManage: '/manage/user',
	userAddNew: '/manage/add-user',
	userUpdate: '/manage/update-user',
	movieManage: '/manage/movie',
	movieAddNew: '/manage/add-movie',
	movieUpdate: '/manage/update-movie',
	movieView: '/manage/view-movie',
	complexesManage: '/manage/complexes',
	cinemaManage: '/manage/cinema',
	cinemaView: '/manage/view-cinema',
	showtimeManage: '/manage/showtime',
	showtimeUpdate: '/manage/update-showtime',
	showtimeAddNew: '/manage/add-showtime',
	showtimeView: '/manage/view-showtime',
	search: '/search',
	notFound: '*',
	resizeImage: (url, width = '', height = '') =>
		`https://images.weserv.nl/?url=${encodeURIComponent(
			url
		)}&w=${width}&h=${height}&fit=outside`,
};
