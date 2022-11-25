import React, { Component } from 'react';
import { Row, Col, Image, Button, Form, Alert, Spinner } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { login, autoLogin } from '../../../service/actions/auth';
import { connect } from 'react-redux';
import { LeftRegister, RightRegister } from '../../../components/common';
import tickitz_white from '../../../assets/images/tickitz-white.svg';
import './styles.css';
import { Formik } from 'formik';
import { path } from '../../../shared/constants/path';
import { schemaYupSignIn } from '../../../shared/constants/yupSchema';

class SignIn extends Component {
	state = {
		show: false,
		message: '',
		isLoading: false,
	};
	submitData = async (values) => {
		this.setState({ isLoading: true });
		await this.props.login(values.email, values.password);
		this.setState({ show: true, isLoading: false });
	};
	componentDidMount() {
		const token = localStorage.getItem('token');
		if (token) {
			this.props.autoLogin(token);
		}
	}
	componentDidUpdate() {
		if (this.props.auth.token) {
			const { history } = this.props;
			history.push('/');
		}
	}
	changeText = (event) => {
		this.setState({ [event.target.name]: event.target.value });
	};
	render() {
		const { show } = this.state;
		return (
			<Row className="container-fluid">
				<LeftRegister>
					<div className="infinity-form-container infinity-form">
						<Image src={tickitz_white} height={150} />
						<p className="text-display-sm m-0 text-white opacity-70">
							Wait, Watch, Wow!
						</p>
					</div>
				</LeftRegister>
				<RightRegister>
					<p className="text-link-lg-48 m-0 pt-3">Sign In</p>
					{show === true && (
						<Alert
							className="pb-0"
							variant={this.props.auth.message !== '' ? 'success' : 'danger'}
							onClose={() => this.setState({ show: false })}
							dismissible
						>
							<p>
								{this.props.auth.message !== ''
									? this.props.auth.message + ', now you can login'
									: this.props.auth.errorMsg}
							</p>
						</Alert>
					)}
					<Formik
						initialValues={{
							email: '',
							password: '',
						}}
						validationSchema={schemaYupSignIn}
						onSubmit={(values, actions) => {
							this.submitData(values).then(() => {
								actions.resetForm(values);
							});
						}}
					>
						{({
							values,
							errors,
							touched,
							handleChange,
							handleBlur,
							handleSubmit,
						}) => (
							<Form.Group>
								<Form.Group>
									<Form.Label>Email</Form.Label>
									<Form.Control
										name="email"
										type="email"
										placeholder="Write your email"
										onChange={handleChange}
										onBlur={handleBlur}
										value={values.email}
									/>
									{errors.email && touched.email ? (
										<p style={{ color: 'red' }}>{errors.email}</p>
									) : null}
								</Form.Group>

								<Form.Group controlId="formBasicPassword">
									<Form.Label>Password</Form.Label>
									<Form.Control
										name="password"
										type="password"
										placeholder="Write your password"
										onChange={handleChange}
										onBlur={handleBlur}
										value={values.password}
									/>
									{errors.password && touched.password ? (
										<p style={{ color: 'red' }}>{errors.password}</p>
									) : null}
								</Form.Group>
								<Row className="justify-content-md-center">
									<Col>
										<Form.Check
											type="checkbox"
											id="custom-switch"
											label="Stay signed in"
										/>
									</Col>

									<Col xs lg="4">
										<p className="pt-0 pl-lg-4">
											<Link
												style={{ textDecoration: 'none' }}
												to={path.forgetPassword}
											>
												{' '}
												Forgot password?
											</Link>
										</p>
									</Col>
								</Row>
								{this.state.isLoading === false ? (
									<Button
										variant="primary"
										type="submit"
										block
										onClick={handleSubmit}
									>
										Sign In
									</Button>
								) : (
									<Button variant="primary" type="loading" block disabled>
										<Spinner
											as="span"
											animation="border"
											size="sm"
											role="status"
											aria-hidden="true"
										/>
										<span className="visually-hidden"> Loading...</span>
									</Button>
								)}
								<p className="text-center pt-3">
									Don't have an account?
									<Link style={{ textDecoration: 'none' }} to={path.signUp}>
										{' '}
										Sign up
									</Link>
								</p>
							</Form.Group>
						)}
					</Formik>
				</RightRegister>
			</Row>
		);
	}
}

const mapStateToProps = (state) => ({
	auth: state.auth,
});
const mapDispatchToProps = { login, autoLogin };

export default connect(mapStateToProps, mapDispatchToProps)(SignIn);
