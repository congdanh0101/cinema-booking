import { path } from '../shared/constants/path';
import React, { Component, Suspense } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { ThemeProvider } from '@material-ui/core/styles';
import persistedStore from '../service/store';

//Register
import SignUp from '../pages/Public/RegisterPage/SignUp';
import SignIn from '../pages/Public/RegisterPage/SignIn';
import ForgetPassword from '../pages/Public/RegisterPage/ForgetPassword';
import EmailVerificationRegister from '../pages/Public/RegisterPage/EmailVerify/EmailVerificationRegister';
import EmailVerificationForgot from '../pages/Public/RegisterPage/EmailVerify/EmailVerificationForgot';

//Public
import HomePage from '../pages/Public/HomePage/HomePage';
import MoviePage from '../pages/Public/MoviePage/MoviePage';
import MovieDetail from '../pages/Public/MovieDetail/MovieDetail';
import OrderPage from '../pages/Public/OrderPage/OrderPage';
import PaymentPage from '../pages/Public/PaymentPage/PaymentPage';
import TicketResult from '../pages/Public/TicketResult/TicketResult';
import ProfilePage from '../pages/Public/ProfilePage/ProfilePage';
import Error from '../pages/Public/NotFound/NotFound';

//Admin
import DashboardPage from '../pages/Admin/Dashboard/Dashboard';
import MoviePanel from '../pages/Admin/MoviePanel/MoviePanel';
import ShowtimePanel from '../pages/Admin/ShowtimePanel/ShowtimePanel';

//Components
import { MainLayout, AdminLayout } from '../layouts';
import { WithLayoutRoute, ProtectedRoute, AdminRoute } from '../shared/routes';
import ScrollToTop from '../shared/utils/utils';
import Theme from '../shared/theme';

export default class App extends Component {
	render() {
		const { store, persistor } = persistedStore();
		return (
			<Suspense fallback={<></>}>
				<Provider store={store}>
					<ThemeProvider theme={Theme}>
						<PersistGate persistor={persistor}>
							<BrowserRouter>
								<ScrollToTop />
								<Switch>
									<Route path={path.signUp} component={SignUp} />
									<Route path={path.signIn} component={SignIn} />
									<Route
										path={path.forgetPassword}
										component={ForgetPassword}
									/>
									<Route
										path={path.emailVerifyRegister}
										component={EmailVerificationRegister}
									/>
									<Route
										path={path.emailVerifyForgot}
										component={EmailVerificationForgot}
									/>

									<WithLayoutRoute
										exact
										path={path.home}
										layout={MainLayout}
										component={HomePage}
									/>
									<WithLayoutRoute
										path={path.movies}
										layout={MainLayout}
										component={MoviePage}
									/>
									<WithLayoutRoute
										path={path.detail}
										layout={MainLayout}
										component={MovieDetail}
									/>
									<ProtectedRoute
										path={path.profile}
										layout={MainLayout}
										component={ProfilePage}
									/>
									<ProtectedRoute
										path={path.order}
										layout={MainLayout}
										component={OrderPage}
									/>
									<ProtectedRoute
										path={path.payment}
										layout={MainLayout}
										component={PaymentPage}
									/>
									<ProtectedRoute
										path={path.ticketResult}
										layout={MainLayout}
										component={TicketResult}
									/>

									<AdminRoute
										path={path.dashboard}
										privateLayout={AdminLayout}
										privateComponent={DashboardPage}
									/>
									<AdminRoute
										path={path.movieManage}
										privateLayout={AdminLayout}
										privateComponent={MoviePanel}
									/>
									<AdminRoute
										path={path.showtimeManage}
										privateLayout={AdminLayout}
										privateComponent={ShowtimePanel}
									/>

									<Route path={path.notFound} component={Error} />
								</Switch>
							</BrowserRouter>
						</PersistGate>
					</ThemeProvider>
				</Provider>
			</Suspense>
		);
	}
}
