import React, { lazy, Suspense } from 'react';
import { HashRouter as Router, Switch, Route } from 'react-router-dom';

import Loading from '../Views/Common/Loading';
import { ProtectedRoute } from '../Routers';

import { Admin, Client } from '../Views/Layouts';

// Admin
const DashboardPage = lazy(() => import('../Views/Components/Admin/Dashboard'));
const MovieList = lazy(() => import('../Views/Components/Admin/MovieList'));
const CinemaList = lazy(() => import('../Views/Components/Admin/CinemaList'));
const ShowtimeList = lazy(() =>
	import('../Views/Components/Admin/ShowtimeList')
);
const ReservationList = lazy(() =>
	import('../Views/Components/Admin/ReservationList')
);
const User = lazy(() => import('../Views/Components/Admin/User'));
const Account = lazy(() => import('../Views/Components/Admin/Account'));

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
