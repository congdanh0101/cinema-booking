import React, { Component } from 'react';
import { withStyles } from '@material-ui/core';
import { Button, TextField, Typography } from '@material-ui/core';
import AuthService from '../../../../Services/Auth';
import { Link } from 'react-router-dom';
import styles from './styles';

class Login extends Component {
	constructor(props) {
		super(props);

		this.state = {
			username: '',
			password: '',
		};

		this.changeUsernameHandler = this.changeUsernameHandler.bind(this);
		this.changePasswordHandler = this.changePasswordHandler.bind(this);
		this.handleLogin = this.handleLogin.bind(this);
	}

	handleLogin = (e) => {
		e.preventDefault();
		let user = {
			username: this.state.username,
			password: this.state.password,
		};
		AuthService.userLogin(user).then((res) => {
			let token = res.data.token;
			console.log(token);
		});
	};

	changeUsernameHandler = (event) => {
		this.setState({ username: event.target.value });
	};

	changePasswordHandler = (event) => {
		this.setState({ password: event.target.value });
	};

	render() {
		return (
			<form>
				<Typography variant="h2">Sign In</Typography>

				<div>
					<TextField
						type="text"
						label="Username"
						name="username"
						value={this.state.username}
						onChange={this.changeUsernameHandler}
						variant="outlined"
					/>
					<TextField
						type="password"
						name="password"
						label="Password"
						value={this.state.password}
						onChange={this.changePasswordHandler}
						variant="outlined"
					/>
				</div>

				<Button
					className="btn btn-success"
					color="primary"
					onClick={this.handleLogin}
					size="large"
					variant="contained"
				>
					Login Now
				</Button>
				<Typography variant="body1">
					Don't have an account ?<Link to="/register">Register</Link>
				</Typography>
			</form>
		);
	}
}

export default withStyles(styles)(Login);
