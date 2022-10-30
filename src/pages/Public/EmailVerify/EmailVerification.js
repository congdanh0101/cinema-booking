import React, { Component } from 'react';
import { withStyles, Typography } from '@material-ui/core';
import Form from 'react-validation/build/form';
import Input from 'react-validation/build/input';
import CheckButton from 'react-validation/build/button';

import AuthService from '../../../../service/axios/Auth';

const required = (value) => {
	if (!value) {
		return (
			<div className="alert alert-danger" role="alert">
				This field is required!
			</div>
		);
	}
};

export default class EmailVerification extends Component {
	constructor(props) {
		super(props);

		this.state = {
			code: '',
		};

		this.handleChangeField = this.handleChangeField.bind(this);
		this.handleEmailVerification = this.handleEmailVerification.bind(this);
	}

	handleEmailVerification = (e) => {
		e.preventDefault();
		let code = {
			code: this.state.code,
		};

		this.setState({
			message: '',
			loading: true,
		});

		this.form.validateAll();

		if (this.checkBtn.context._errors.length === 0) {
			AuthService.emailVerificationRegister(code).then(
				() => {
					this.props.router.navigate('/login');
					window.location.reload();
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

	handleChangeField = (event) => {
		this.setState({ code: event.target.value });
	};

	render() {
		return (
			<div className="col-md-12">
				<div className="card card-container">
					<Typography variant="h2">Email Verify</Typography>
					<Form
						onSubmit={this.handleEmailVerification}
						ref={(c) => {
							this.form = c;
						}}
					>
						<div className="form-group">
							<label htmlFor="code">Code</label>
							<Input
								type="text"
								className="form-control"
								name="code"
								value={this.state.code}
								onChange={this.handleEmailVerification}
								variant="outlined"
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
					</Form>
				</div>
			</div>
		);
	}
}
