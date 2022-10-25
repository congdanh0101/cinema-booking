import React, { lazy, Suspense } from 'react';
import { HashRouter as Router, Switch, Route } from 'react-router-dom';

import Loading from './Views/Components/Loading';
import { ProtectedRoute } from './Routers';

import { Admin } from './Layouts';

// Admin
const DashboardPage = lazy(() => import('./Views/Admin/Dashboard'));
const MovieList = lazy(() => import('./Views/Admin/MovieList'));
const CinemaList = lazy(() => import('./Views/Admin/CinemaList'));
const ShowtimeList = lazy(() => import('./Views/Admin/ShowtimeList'));
const ReservationList = lazy(() => import('./Views/Admin/ReservationList'));
const User = lazy(() => import('./Views/Admin/User'));
const Account = lazy(() => import('./Views/Admin/Account'));

const Routes = () => {
	return (
		<Suspense fallback={<Loading />}>
			<Router>
				<Switch>
					<ProtectedRoute
						exact
						path="/Admin/dashboard"
						layout={Admin}
						component={DashboardPage}
					/>
					<ProtectedRoute
						exact
						path="/Admin/users"
						layout={Admin}
						component={User}
					/>
					<ProtectedRoute
						exact
						path="/Admin/showtimes"
						layout={Admin}
						component={ShowtimeList}
					/>
					<ProtectedRoute
						exact
						path="/Admin/reservations"
						layout={Admin}
						component={ReservationList}
					/>
					<ProtectedRoute
						exact
						path="/Admin/cinemas"
						layout={Admin}
						component={CinemaList}
					/>
					<ProtectedRoute
						exact
						path="/Admin/movies"
						layout={Admin}
						component={MovieList}
					/>
					<ProtectedRoute
						exact
						path="/Admin/account"
						layout={Admin}
						component={Account}
					/>
					<Route path="*" component={() => '404 NOT FOUND'} />
				</Switch>
			</Router>
		</Suspense>
	);
};

export default Routes;
