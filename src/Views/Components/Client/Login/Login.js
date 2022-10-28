import React, { Component } from 'react';
import { withStyles, Typography } from '@material-ui/core';
import { Link } from 'react-router-dom';
import Form from 'react-validation/build/form';
import Input from 'react-validation/build/input';
import CheckButton from 'react-validation/build/button';

import styles from './styles';
import AuthService from '../../../../Services/Auth/Auth';
import { withRouter } from '../../../../Views/Common/Auth/WithRouter';

const required = (value) => {
	if (!value) {
		return (
			<div className="alert alert-danger" role="alert">
				This field is required!
			</div>
		);
	}
};

class Login extends Component {
	constructor(props) {
		super(props);

		this.state = {
			username: '',
			password: '',
			loading: false,
			message: '',
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

		this.setState({
			message: '',
			loading: true,
		});

		AuthService.userLogin(user).then((res) => {
			let token = res.data.token;
			console.log(token);
		});

		this.form.validateAll();

		if (this.checkBtn.context._errors.length === 0) {
			AuthService.userLogin(user).then(
				(res) => {
					this.props.router.navigate('/login');
					window.location.reload();
					let token = res.data.token;
					console.log(token);
				},
				(error) => {
					const resMessage =
						(error.response &&
							error.response.data &&
							error.response.data.message) ||
						error.message ||
						error.toString();

					this.setState({
						loading: false,
						message: resMessage,
					});
				}
			);
		} else {
			this.setState({
				loading: false,
			});
		}
	};

	changeUsernameHandler = (event) => {
		this.setState({ username: event.target.value });
	};

	changePasswordHandler = (event) => {
		this.setState({ password: event.target.value });
	};

	render() {
		return (
			<div className="col-md-12">
				<div className="card card-container">
					<Typography variant="h2">Sign in</Typography>
					<img
						src="//ssl.gstatic.com/accounts/ui/avatar_2x.png"
						alt="profile-img"
						className="profile-img-card"
					/>
					<Form
						onSubmit={this.handleLogin}
						ref={(c) => {
							this.form = c;
						}}
					>
						<div className="form-group">
							<label htmlFor="username">Username</label>
							<Input
								type="text"
								className="form-control"
								name="username"
								value={this.state.username}
								onChange={this.changeUsernameHandler}
								variant="outlined"
								validations={[required]}
							/>
						</div>
						<div className="form-group">
							<label htmlFor="password">Password</label>
							<Input
								type="password"
								className="form-control"
								name="password"
								value={this.state.password}
								onChange={this.changePasswordHandler}
								validations={[required]}
							/>
						</div>
						<div className="form-group">
							<button
								className="btn btn-primary btn-block"
								disabled={this.state.loading}
								color="primary"
								size="large"
								variant="contained"
							>
								{this.state.loading && (
									<span className="spinner-border spinner-border-sm"></span>
								)}
								<span>Login</span>
							</button>
						</div>

						{this.state.message && (
							<div className="form-group">
								<div className="alert alert-danger" role="alert">
									{this.state.message}
								</div>
							</div>
						)}
						<CheckButton
							style={{ display: 'none' }}
							ref={(c) => {
								this.checkBtn = c;
							}}
						/>

						<Typography variant="body1">
							Don't have an account ?<Link to="/register">Register</Link>
						</Typography>
					</Form>
				</div>
			</div>
		);
	}
}

export default withRouter(Login);
