import React, { Component } from 'react';
import { Row, Image, Button, Form, Alert, Spinner } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { login } from '../../../service/actions/auth';
import { connect } from 'react-redux';
import LeftRegister from '../../../components/register/LeftRegister';
import RightRegister from '../../../components/register/RightRegister';
import tickitz_white from '../../../assets/images/tickitz-white.svg';
import './styles.css';
import { Formik } from 'formik';
import * as Yup from 'yup';

const ValidatorSchema = Yup.object().shape({
	email: Yup.string().email('Invalid email').required('Required'),
	password: Yup.string()
		.min(2, ({ min }) => `Password must be at least ${min} characters`)
		.required('Password is required'),
});
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
	componentDidUpdate() {
		if (this.props.auth.token) {
			window.alert('Success go to dashboard');
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
							wait, watch, wow!
						</p>
					</div>
				</LeftRegister>
				<RightRegister>
					<p className="text-link-lg-48 m-0 pt-3">Sign in</p>
					<p className="text-md opacity-70 m-0 pb-4">
						Sign in with your data that you entered during your registration
					</p>
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
						validationSchema={ValidatorSchema}
						onSubmit={(values) => {
							this.submitData(values);
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
									<Spinner animation="border" variant="primary" />
								)}
								<p className="text-center pt-3">
									Forgot your password?
									<Link to="/forgot-password"> Reset now</Link>
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
const mapDispatchToProps = { login };

export default connect(mapStateToProps, mapDispatchToProps)(SignIn);
