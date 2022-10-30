import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { withStyles } from '@material-ui/core';
import {
	Button,
	Grid,
	IconButton,
	TextField,
	Typography,
} from '@material-ui/core';
import { ArrowBack as ArrowBackIcon } from '@material-ui/icons';
import styles from './styles';
import AuthService from '../../../service/axios/Auth';

class Register extends Component {
	constructor(props) {
		super(props);

		this.state = {
			values: {
				firstName: '',
				lastName: '',
				email: '',
				phone: '',
				password: '',
				gender: '',
			},
		};

		this.handleRegister = this.handleRegister.bind(this);

		this.onChangeFirstName = this.onChangeFirstName.bind(this);
		this.onChangeLastName = this.onChangeLastName.bind(this);
		this.onChangePhone = this.onChangePhone.bind(this);
		this.onChangeEmail = this.onChangeEmail.bind(this);
		this.onChangePassword = this.onChangePassword.bind(this);
		this.onChangeGender = this.onChangeGender.bind(this);
	}

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
		let user = {
			firstName: this.state.firstName,
			lastName: this.state.lastName,
			phoneNumber: this.state.phoneNumber,
			email: this.state.email,
			password: this.state.password,
			gender: this.state.gender,
		};
		AuthService.userRegister(user).then((res) => {
			let token = res.data.token;
			console.log(token);
		});
	};

	render() {
		const { classes } = this.props;
		const { values } = this.state;

		return (
			<div className={classes.root}>
				<Grid className={classes.grid} container>
					<Grid className={classes.bgWrapper} item lg={5}>
						<div className={classes.bg} />
					</Grid>
					<Grid className={classes.content} item lg={7} xs={12}>
						<div className={classes.content}>
							<div className={classes.contentHeader}>
								<IconButton
									className={classes.backButton}
									onClick={this.handleBack}
								>
									<ArrowBackIcon />
								</IconButton>
							</div>
							<div className={classes.contentBody}>
								<form className={classes.form}>
									<Typography className={classes.title} variant="h2">
										Create new account
									</Typography>
									<Typography className={classes.subtitle} variant="body1">
										Use your email to create new account... it's free.
									</Typography>
									<div className={classes.fields}>
										<TextField
											className={classes.textField}
											label="First name"
											name="fistName"
											value={values.firstName}
											onChange={this.onChangeFirstName}
											variant="outlined"
										/>

										<TextField
											className={classes.textField}
											label="Last name"
											name="lastName"
											value={values.lastName}
											onChange={this.onChangeLastName}
											variant="outlined"
										/>

										<TextField
											className={classes.textField}
											label="Gender"
											type="gender"
											value={values.gender}
											variant="outlined"
											onChange={this.onChangeGender}
										/>

										<TextField
											className={classes.textField}
											label="Email address"
											name="email"
											value={values.email}
											onChange={this.onChangeEmail}
											variant="outlined"
										/>

										<TextField
											className={classes.textField}
											label="Mobile Phone"
											name="phone"
											value={values.phone}
											variant="outlined"
											onChange={this.onChangePhone}
										/>

										<TextField
											className={classes.textField}
											label="Password"
											type="password"
											value={values.password}
											variant="outlined"
											onChange={this.onChangePassword}
										/>
									</div>

									<Button
										className={classes.registerButton}
										color="primary"
										onClick={this.handleRegister}
										size="large"
										variant="contained"
									>
										Register now
									</Button>

									<Typography className={classes.login} variant="body1">
										Have an account ?{' '}
										<Link className={classes.loginUrl} to="/login">
											Login
										</Link>
									</Typography>
								</form>
							</div>
						</div>
					</Grid>
				</Grid>
			</div>
		);
	}
}

export default withStyles(styles)(Register);
