import React, { Component } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

//Register
import SignUp from './pages/register/SignUp';
import SignIn from './pages/register/SignIn';
import ForgetPassword from './pages/register/ForgetPassword';
import ResetPassword from './pages/register/ResetPassword';
import EmailVerification from './pages/register/EmailVerification';

//Public
import HomePage from './pages/home-page/HomePage';
import MoviePage from './pages/movie-page/MoviePage';
import MovieDetail from './pages/movie-detail/MovieDetail';
import OrderPage from './pages/order-page/OrderPage';
import PaymentPage from './pages/payment-page/PaymentPage';
import TicketResult from './pages/ticket-result-page/TicketResult';
import ProfilePage from './pages/profile-page/ProfilePage';

//Admin
import AdminPage from './pages/admin-page/AdminPage';
import AdminPanel from './pages/admin-panel/AdminPanel';

import PrivateRoute from './shared/router/PrivateRoute';
import persistedStore from './redux/store';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import ScrollToTop from './shared/helpers/ScrollToTop';
import Error from './pages/Error';

export default class App extends Component {
	render() {
		const { store, persistor } = persistedStore();
		return (
			<Provider store={store}>
				<PersistGate persistor={persistor}>
					<BrowserRouter>
						<ScrollToTop />
						<Switch>
							<Route path="/" exact component={HomePage} />

							<Route path="/sign-up" component={SignUp} />
							<Route path="/login" component={SignIn} />
							<Route path="/email-verify" component={EmailVerification} />

							<Route path="/forgot-password" component={ForgetPassword} />
							<Route path="/reset-password" component={ResetPassword} />

							<Route path="/movies" component={MoviePage} />
							<Route path="/movie-detail/:id" component={MovieDetail} />
							<PrivateRoute path="/order-page" privateComponent={OrderPage} />
							<PrivateRoute path="/payment" privateComponent={PaymentPage} />
							<PrivateRoute
								path="/ticket-result"
								privateComponent={TicketResult}
							/>
							<PrivateRoute
								path="/profile-page"
								privateComponent={ProfilePage}
							/>
							<PrivateRoute path="/admin-page" privateComponent={AdminPage} />
							<PrivateRoute path="/admin-panel" privateComponent={AdminPanel} />
							<Route path="*" component={Error} />
						</Switch>
					</BrowserRouter>
				</PersistGate>
			</Provider>
		);
	}
}
