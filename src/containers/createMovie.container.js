import React, { Component } from 'react';
import { Button, Form } from 'react-bootstrap';
import { connect } from 'react-redux';
import http from '../shared/apis/axiosClient';
import { addMovie } from '../service/actions/movie';

class CreateMovie extends Component {
	state = {
		name: '',
		duration: '',
		description: '',
		image: '',
		trailer: '',
		releases: '',
		genres: '',
		display: '',
		showing: '',
		coming: '',
	};

	// submitData = (e) => {
	// 	e.preventDefault();
	// 	const { name } = this.state;
	// 	this.props.movie(name);
	// };

	changeText = (event) => {
		this.setState({ [event.target.name]: event.target.value });
	};

	saveData = async (e) => {
		e.preventDefault();
		const data = new URLSearchParams();
		const { title } = this.state;
		data.append('title', title);
		const response = await http(this.props.auth.token).post('movies', data);
		window.alert(response.data.message);
	};

	render() {
		return (
			<div>
				<Form.Group onSubmit={this.saveData}>
					<Form.Group>
						<Form.Label>title</Form.Label>
						<Form.Control
							onChange={(event) => this.changeText(event)}
							name="title"
							placeholder="Write your title"
						/>
						<Form.Label>title</Form.Label>
						<Form.Control
							onChange={(event) => this.changeText(event)}
							name="title"
							placeholder="Write your title"
						/>
					</Form.Group>
					<Button variant="primary" type="submit" block>
						Submit
					</Button>
				</Form.Group>
			</div>
		);
	}
}

const mapStateToProps = (state) => ({
	auth: state.auth,
});
const mapDispatchToProps = { addMovie };

export default connect(mapStateToProps, mapDispatchToProps)(CreateMovie);
