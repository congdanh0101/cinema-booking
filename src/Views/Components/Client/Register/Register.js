import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { withStyles } from '@material-ui/core';
import Form from 'react-validation/build/form';
import Input from 'react-validation/build/input';
import CheckButton from 'react-validation/build/button';
import { isEmail } from 'validator';
import styles from './styles';
import AuthService from '../../../../Services/Auth/Auth';

const required = (value) => {
	if (!value) {
		return (
			<div className="alert alert-danger" role="alert">
				This field is required!
			</div>
		);
	}
};

const email = (value) => {
	if (!isEmail(value)) {
		return (
			<div className="alert alert-danger" role="alert">
				This is not a valid email.
			</div>
		);
	}
};

const phone = (value) => {
	if (value.length < 10 || value.length > 11) {
		return (
			<div className="alert alert-danger" role="alert">
				The username must be between 3 and 20 characters.
			</div>
		);
	}
};

const vfirstName = (value) => {
	if (value.length < 3 || value.length > 20) {
		return (
			<div className="alert alert-danger" role="alert">
				The username must be between 3 and 20 characters.
			</div>
		);
	}
};

const vlastName = (value) => {
	if (value.length < 3 || value.length > 20) {
		return (
			<div className="alert alert-danger" role="alert">
				The username must be between 3 and 20 characters.
			</div>
		);
	}
};

const vpassword = (value) => {
	if (value.length < 6 || value.length > 40) {
		return (
			<div className="alert alert-danger" role="alert">
				The password must be between 6 and 40 characters.
			</div>
		);
	}
};

class Register extends Component {
	constructor(props) {
		super(props);

		this.state = {
			firstName: '',
			lastName: '',
			phoneNumber: '',
			email: '',
			password: '',
			gender: '',
		};

		this.handleRegister = this.handleRegister.bind(this);
		this.onChangeFirstName = this.onChangeFirstName.bind(this);
		this.onChangeLastName = this.onChangeLastName.bind(this);
		this.onChangePhone = this.onChangePhone.bind(this);
		this.onChangeEmail = this.onChangeEmail.bind(this);
		this.onChangePassword = this.onChangePassword.bind(this);
		this.onChangeGender = this.onChangeGender.bind(this);
	}

	componentDidUpdate(prevProps) {
		const { isAuthenticated, history } = this.props;
		if (prevProps.isAuthenticated !== isAuthenticated || isAuthenticated)
			history.push('/');
	}

	handleBack = () => {
		const { history } = this.props;
		history.goBack();
	};

	onChangeFirstName(e) {
		this.setState({
			firstName: e.target.value,
		});
	}

	onChangeLastName(e) {
		this.setState({
			lastName: e.target.value,
		});
	}

	onChangeEmail(e) {
		this.setState({
			email: e.target.value,
		});
	}

	onChangePhone(e) {
		this.setState({
			phone: e.target.value,
		});
	}

	onChangePassword(e) {
		this.setState({
			password: e.target.value,
		});
	}

	onChangeGender(e) {
		this.setState({
			gender: e.target.value,
		});
	}

	handleRegister = (e) => {
		e.preventDefault();

		this.setState({ message: '', successful: false });

		this.form.validateAll();

		let user = {
			firstName: this.state.firstName,
			lastName: this.state.lastName,
			phoneNumber: this.state.phoneNumber,
			email: this.state.email,
			password: this.state.password,
			gender: this.state.gender,
		};

		if (this.checkBtn.context._errors.length === 0) {
			AuthService.userRegister(user).then(
				(res) => {
					this.setState({
						message: res.data.message,
						successful: true,
					});
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
						successful: false,
						message: resMessage,
					});
				}
			);
		}
	};

	render() {
		return (
			<div className="col-md-12">
				<div className="card card-container">
					<img
						src="//ssl.gstatic.com/accounts/ui/avatar_2x.png"
						alt="profile-img"
						className="profile-img-card"
					/>
					<Form
						onSubmit={this.handleRegister}
						ref={(c) => {
							this.form = c;
						}}
					>
						{!this.state.successful && (
							<div>
								<div className="form-group">
									<label htmlFor="firstName">FirstName</label>
									<Input
										type="text"
										className="form-control"
										name="firstName"
										value={this.state.firstName}
										onChange={this.onChangeFirstName}
										validations={[required, vfirstName]}
									/>
								</div>

								<div className="form-group">
									<label htmlFor="lastName">LastName</label>
									<Input
										type="text"
										className="form-control"
										name="lastName"
										value={this.state.lastName}
										onChange={this.onChangeLastName}
										validations={[required, vlastName]}
									/>
								</div>

								<div className="form-group">
									<label htmlFor="email">Email</label>
									<Input
										type="text"
										className="form-control"
										name="email"
										value={this.state.email}
										onChange={this.onChangeEmail}
										validations={[required, email]}
									/>
								</div>

								<div className="form-group">
									<label htmlFor="phone">Phone</label>
									<Input
										type="text"
										className="form-control"
										name="phone"
										value={this.state.phoneNumber}
										onChange={this.onChangePhone}
										validations={[required, phone]}
									/>
								</div>

								<div className="form-group">
									<label htmlFor="gender">Gender</label>
									<Input
										type="text"
										className="form-control"
										name="gender"
										value={this.state.gender}
										onChange={this.onChangeGender}
									/>
								</div>

								<div className="form-group">
									<label htmlFor="password">Password</label>
									<Input
										type="password"
										className="form-control"
										name="password"
										value={this.state.password}
										onChange={this.onChangePassword}
										validations={[required, vpassword]}
									/>
								</div>

								<div className="form-group">
									<button className="btn btn-primary btn-block">Sign Up</button>
								</div>
							</div>
						)}

						{this.state.message && (
							<div className="form-group">
								<div
									className={
										this.state.successful
											? 'alert alert-success'
											: 'alert alert-danger'
									}
									role="alert"
								>
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
					</Form>
				</div>
			</div>
		);
	}
}

export default withStyles(styles)(Register);
