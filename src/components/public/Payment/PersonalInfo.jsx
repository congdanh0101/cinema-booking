import React, { Component } from 'react';
import { Form, InputGroup } from 'react-bootstrap';
import './styles.css';

export default class PersonalInfo extends Component {
	render() {
		return (
			<Form.Group>
				<Form.Group>
					<Form.Label>Full Name</Form.Label>
					<Form.Control type="email" placeholder="Jonas El Rodriguez" />
				</Form.Group>

				<Form.Group>
					<Form.Label>Email</Form.Label>
					<Form.Control type="email" placeholder="jonasrodri123@gmail.com" />
				</Form.Group>

				<Form.Group>
					<Form.Label>Phone Number</Form.Label>
					<InputGroup className="mb-3">
						<InputGroup.Prepend className="contact">
							<InputGroup.Text>+84</InputGroup.Text>
						</InputGroup.Prepend>
						<Form.Control type="number" placeholder="81445687121" />
					</InputGroup>
				</Form.Group>
			</Form.Group>
		);
	}
}
