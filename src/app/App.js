import { path } from '../shared/constants/path';
import React, { Component, Suspense } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { ThemeProvider } from '@material-ui/core/styles';
import persistedStore from '../service/store';

//Register
import SignUp from '../pages/Public/register/SignUp';
import SignIn from '../pages/Public/register/SignIn';
import ForgetPassword from '../pages/Public/register/ForgetPassword';
import ResetPassword from '../pages/Public/register/ResetPassword';
import EmailVerification from '../pages/Public/register/EmailVerification';

//Public
import HomePage from '../pages/Public/home-page/HomePage';
import MoviePage from '../pages/Public/movie-page/MoviePage';
import MovieDetail from '../pages/Public/movie-detail/MovieDetail';
import OrderPage from '../pages/Public/order-page/OrderPage';
import PaymentPage from '../pages/Public/payment-page/PaymentPage';
import TicketResult from '../pages/Public/ticket-result-page/TicketResult';
import ProfilePage from '../pages/Public/profile-page/ProfilePage';

//Admin
import AdminPage from '../pages/Admin/admin-page/AdminPage';
import AdminPanel from '../pages/Admin/admin-panel/AdminPanel';
import DashboardPage from '../pages/Admin/dashboard/Dashboard';
import MoviePanel from '../pages/Admin/movie-panel/MoviePanel';

//Components
import { MainLayout, AdminLayout } from '../layouts';
import { WithLayoutRoute, ProtectedRoute } from '../shared/routes';
import ScrollToTop from '../shared/utils/utils';
import Error from '../pages/NotFound';
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
										path={path.emailVerification}
										component={EmailVerification}
									/>
									<Route
										path={path.forgetPassword}
										component={ForgetPassword}
									/>
									<Route path={path.resetPassword} component={ResetPassword} />
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
										component={TicketResult}
									/>
									<ProtectedRoute
										path={'/admin-page'}
										layout={AdminLayout}
										component={AdminPage}
									/>
									<ProtectedRoute
										path={path.dashboard}
										layout={AdminLayout}
										component={DashboardPage}
									/>
									<ProtectedRoute
										path="/admin-panel/movies"
										layout={AdminLayout}
										component={MoviePanel}
									/>
									<ProtectedRoute
										path="/admin-panel"
										layout={AdminLayout}
										component={AdminPanel}
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
