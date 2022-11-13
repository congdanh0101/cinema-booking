import React, { Component } from 'react';
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
import { AdminLayout, PublicLayout } from '../layouts';
import { WithLayoutRoute, PrivateRoute } from '../shared/routes';
import ScrollToTop from '../shared/utils/utils';
import Error from '../pages/Error';
import Theme from '../shared/theme';

export default class App extends Component {
	render() {
		const { store, persistor } = persistedStore();
		return (
			<Provider store={store}>
				<ThemeProvider theme={Theme}>
					<PersistGate persistor={persistor}>
						<BrowserRouter>
							<ScrollToTop />
							<Switch>
								<Route path="/sign-up" component={SignUp} />
								<Route path="/login" component={SignIn} />
								<Route path="/email-verify" component={EmailVerification} />
								<Route path="/forgot-password" component={ForgetPassword} />
								<Route path="/reset-password" component={ResetPassword} />
								<WithLayoutRoute
									exact
									path="/"
									layout={PublicLayout}
									component={HomePage}
								/>
								<WithLayoutRoute
									path="/movies"
									layout={PublicLayout}
									component={MoviePage}
								/>
								<WithLayoutRoute
									path="/movie-detail/:id"
									layout={PublicLayout}
									component={MovieDetail}
								/>
								<PrivateRoute
									path="/order-page"
									privateLayout={PublicLayout}
									privateComponent={OrderPage}
								/>
								<PrivateRoute
									path="/payment"
									privateLayout={PublicLayout}
									privateComponent={PaymentPage}
								/>
								<PrivateRoute
									path="/ticket-result"
									privateComponent={TicketResult}
								/>
								<PrivateRoute
									path="/profile-page"
									privateLayout={PublicLayout}
									privateComponent={ProfilePage}
								/>
								<PrivateRoute
									path="/admin-page"
									privateLayout={PublicLayout}
									privateComponent={AdminPage}
								/>
								<PrivateRoute
									path="/admin-panel/dashboard"
									privateLayout={AdminLayout}
									privateComponent={DashboardPage}
								/>
								<PrivateRoute
									path="/admin-panel/movies"
									privateLayout={AdminLayout}
									privateComponent={MoviePanel}
								/>
								<PrivateRoute
									path="/admin-panel"
									privateLayout={AdminLayout}
									privateComponent={AdminPanel}
								/>
								<Route path="*" component={Error} />
							</Switch>
						</BrowserRouter>
					</PersistGate>
				</ThemeProvider>
			</Provider>
		);
	}
}
