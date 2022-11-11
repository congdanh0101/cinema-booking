import React, { Component, Fragment } from 'react';

import { Button, Col, Container, Navbar, Row, Nav } from 'react-bootstrap';
import { Switch, Route, Link } from 'react-router-dom';

import CreateMovie from '../../../containers/createMovie.container';
import GenreTable from '../../../containers/genreTable.container';
import MovieTable from '../../../containers/movieTable.container';
import EditMovie from '../../../containers/editMovie.container';
import EditGenre from '../../../containers/editGenre.container';

export default class AdminPanel extends Component {
	render() {
		return (
			<Fragment>
				<Container>
					<Row>
						<Col md={3}>
							<Nav className="flex-column">
								<Link className="nav-link" to="/admin-panel/profile">
									Profile
								</Link>

								<Link className="nav-link" to="/admin-panel/settings">
									Settings
								</Link>

								<Link className="nav-link" to="/admin-panel/manage_user">
									Manage User
								</Link>

								<Link className="nav-link" to="/admin-panel/manage_movie">
									Manage Movie
								</Link>

								<Link className="nav-link" to="/admin-panel/manage_genre">
									Manage Genre
								</Link>
							</Nav>
						</Col>
						<Col md={9}>
							<Switch>
								<Route path="/admin-panel" exact>
									<h1>Welcome to admin panel</h1>
									<p>Here you can manage data for your system!</p>
								</Route>
								<Route path="/admin-panel/profile">Hello</Route>
								<Route path="/admin-panel/settings">Settings</Route>
								<Route path="/admin-panel/manage_user">Manage User</Route>
								<Route path="/admin-panel/manage_movie" exact>
									<MovieTable />
								</Route>
								<Route
									path="/admin-panel/manage_movie/edit/:id"
									component={EditMovie}
								/>
								<Route
									path="/admin-panel/manage_movie/add"
									component={CreateMovie}
								/>
								<Route path="/admin-panel/manage_genre" exact>
									<GenreTable />
								</Route>
								<Route
									path="/admin-panel/manage_genre/edit/:id"
									component={EditGenre}
								/>
							</Switch>
						</Col>
					</Row>
				</Container>
			</Fragment>
		);
	}
}
