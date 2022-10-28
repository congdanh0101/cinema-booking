import React, { lazy, Suspense } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import Loading from '../Views/Common/Loading';
import { WithLayoutRoute } from '../Routers';

import { PublicLayout } from '../Views/Layout';

// Client
import ListMovie from '../Views/Components/Client/Movies';
import Login from '../Views/Components/Client/Login';
import Register from '../Views/Components/Client/Login';
// import HomePage from '../Views/Components/Client/HomePage';

const Routes = () => {
	return (
		<Router>
			<div className="container">
				<Switch>
					<Route path="/register" layout={PublicLayout} component={Login} />
					<Route path="/register" layout={PublicLayout} component={Register} />

					{/* <Route path="/" exact component={HomePage} /> */}

					<Route path="*" component={() => '404 NOT FOUND'} />
				</Switch>
			</div>
		</Router>
	);
};

export default Routes;