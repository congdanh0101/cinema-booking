import React, { Component } from 'react';
import { Card, Col } from 'react-bootstrap';
import DetailInfo from './DetailInfo';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import './styles.css';
import PrivacyInfo from './PrivacyInfo';

export default class AccountProfile extends Component {
	render() {
		return (
			<Router>
				<Col xs={12} md={12} className="pb-5">
					<Card bg="light" variant="light">
						<Card.Body className="d-flex">Account Settings</Card.Body>
					</Card>
					<Switch>
						<Route exact path="/profile">
							<PrivacyInfo />
						</Route>
					</Switch>
				</Col>
			</Router>
		);
	}
}
