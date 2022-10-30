import React, { Component } from 'react';
import { withStyles } from '@material-ui/styles';
import { Button, TextField, Typography } from '@material-ui/core';
import { Link } from 'react-router-dom';
import styles from '../styles';
import AuthService from '../../../../service/axios/Auth';
import { history } from '../../../../shared/utils';
import { withRouter } from '../../../../shared/utils/WithRouter';

class LoginForm extends Component {
	constructor(props) {
		super(props);

		this.state = {
			username: '',
			password: '',
		};

		this.onChangeUsername = this.onChangeUsername.bind(this);
		this.onChangePassword = this.onChangePassword.bind(this);
		this.handleLogin = this.handleLogin.bind(this);
	}

	handleLogin = (e) => {
		e.preventDefault();

		AuthService.userLogin(this.state.username, this.state.password).then(() => {
			history.push('/mydashboard');
		});
	};

	onChangeUsername = (event) => {
		this.setState({ username: event.target.value });
	};

	onChangePassword = (event) => {
		this.setState({ password: event.target.value });
	};

	render() {
		const { classes } = this.props;

		return (
			<form className={classes.form}>
				<Typography className={classes.title} variant="h2">
					Sign in
				</Typography>

				<div className={classes.fields}>
					<TextField
						className={classes.textField}
						label="Username"
						name="username"
						onChange={this.onChangeUsername}
						type="text"
						value={this.state.username}
						variant="outlined"
					/>
					<TextField
						className={classes.textField}
						label="Password"
						name="password"
						onChange={this.onChangePassword}
						type="password"
						value={this.state.password}
						variant="outlined"
					/>
				</div>

				<Button
					className={classes.loginButton}
					color="primary"
					onClick={this.handleLogin}
					size="large"
					variant="contained"
				>
					Login now
				</Button>
				<Typography className={classes.register} variant="body1">
					Don't have an account ?
					<Link className={classes.registerUrl} to="/register">
						Register now
					</Link>
				</Typography>
			</form>
		);
	}
}

export default withStyles(styles)(withRouter(LoginForm));
