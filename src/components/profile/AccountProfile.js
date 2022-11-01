import React, { Component } from 'react';
import { Card, Col } from 'react-bootstrap';
import DetailInfo from './DetailInfo';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import './styles.css';
export default class AccountProfile extends Component {
	render() {
		return (
			<Router>
				<Col xs={12} md={8} className="pb-5">
					<Card bg="light" variant="light">
						<Card.Body className="d-flex">Account Settings</Card.Body>
					</Card>
					<Switch>
						<Route exact path="/profile-page">
							<DetailInfo />
						</Route>
					</Switch>
				</Col>
			</Router>
		);
	}
}
