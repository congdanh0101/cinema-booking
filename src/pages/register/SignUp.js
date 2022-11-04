import React, { Component } from 'react';
import {
	Container,
	Row,
	Image,
	Button,
	ListGroup,
	Form,
	Alert,
	Spinner,
	Col,
	InputGroup,
} from 'react-bootstrap';
import { Link } from 'react-router-dom';
import LeftRegister from '../../components/register/LeftRegister';
import RightRegister from '../../components/register/RightRegister';
import tickitz_white from '../../assets/images/tickitz-white.svg';
import './styles.css';
import { connect } from 'react-redux';
import { register } from '../../redux/actions/auth';
import { Formik } from 'formik';
import * as Yup from 'yup';

const ValidatorSchema = Yup.object().shape({
	firstName: Yup.string()
		.min(2, 'Too Short!')
		.max(30, 'Too Long!')
		.required('Required'),
	lastName: Yup.string()
		.min(2, 'Too Short!')
		.max(30, 'Too Long!')
		.required('Required'),
	phoneNumber: Yup.string()
		.min(9, ({ min }) => `Phone number must be at least ${min} characters`)
		.required('Required'),
	gender: Yup.string().required('Required'),
	email: Yup.string().email('Invalid email').required('Required'),
	password: Yup.string()
		.min(1, ({ min }) => `Password must be at least ${min} characters`)
		.required('Password is required'),
	confirmPassword: Yup.string()
		.test('passwords-match', 'Passwords must match', function (value) {
			return this.parent.password === value;
		})
		.required('Confirm password is required'),
});

class SignUp extends Component {
	state = {
		show: false,
		message: '',
		isLoading: false,
	};
	submitData = async (values) => {
		this.setState({ isLoading: true });
		await this.props.register(
			values.firstName,
			values.lastName,
			values.phoneNumber,
			values.email,
			values.confirmPassword,
			values.gender
		);
		this.setState({ show: true, isLoading: false });
		sessionStorage.setItem('show', this.props.auth.message);
	};
	render() {
		const { history } = this.props;
		const { show } = this.state;
		return (
			<Row className="container-fluid">
				<LeftRegister>
					<Container>
						<Image src={tickitz_white} width={250} />
						<p className="text-display-md-bold m-0 text-white pt-5">
							Lets build your account
						</p>
						<p className="text-lg text-white pb-3 opacity-70 ">
							To be a loyal moviegoer and access all of features, your details
							are required.
						</p>
						<ListGroup>
							<li>
								<Button
									variant="outline-light"
									className="btn-sm rounded-circle"
									active
								>
									1<div className="vertical-line"></div>
								</Button>
								<label className="form-check-label text-white pb-3">
									<p className="pl-3">Fill your additional details</p>
								</label>
							</li>
							<li>
								<Button
									variant="outline-light"
									className="btn-sm rounded-circle"
								>
									2<div className="vertical-line"></div>
								</Button>
								<label className="form-check-label text-label-non-active text-white pb-3">
									<p className="pl-3 text-color-placeholder">
										Activate your account
									</p>
								</label>
							</li>
							<li>
								<Button
									variant="outline-light"
									className="btn-sm rounded-circle"
								>
									3
								</Button>
								<label className="form-check-label text-label-non-active text-white pb-3">
									<p className="pl-3 text-color-placeholder">Done</p>
								</label>
							</li>
						</ListGroup>
					</Container>
				</LeftRegister>
				<RightRegister>
					<p className="text-link-lg-26 pb-3 pt-5">
						Fill your additional details
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
									? this.props.auth.message
									: this.props.auth.errorMsg}
							</p>
						</Alert>
					)}
					{(show === true) &
					(this.props.auth.message ===
						sessionStorage.getItem('show'))
						? ('', history.push('/email-verify'))
						: ''}
					<Formik
						initialValues={{
							firstName: '',
							lastName: '',
							phoneNumber: '',
							email: '',
							password: '',
							confirmPassword: '',
							gender: '',
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
									<Row className="mb-3">
										<Col>
											<Form.Label>First Name</Form.Label>
											<Form.Control
												type="text"
												placeholder="Write your first name"
												name="firstName"
												onChange={handleChange}
												onBlur={handleBlur}
												value={values.firstName}
												isValid={touched.firstName && !errors.firstName}
											/>
											{errors.firstName && touched.firstName ? (
												<div style={{ color: 'red' }}>{errors.firstName}</div>
											) : null}
										</Col>
										<Col>
											<Form.Label>Last Name</Form.Label>
											<Form.Control
												type="text"
												placeholder="Write your last name"
												name="lastName"
												onChange={handleChange}
												onBlur={handleBlur}
												value={values.lastName}
												isValid={touched.lastName && !errors.lastName}
											/>
											{errors.lastName && touched.lastName ? (
												<div style={{ color: 'red' }}>{errors.lastName}</div>
											) : null}
										</Col>
									</Row>
									<Row>
										<Col>
											<Form.Label>Gender</Form.Label>
											<Form.Control
												as="select"
												type="gender"
												name="gender"
												onChange={handleChange}
												onBlur={handleBlur}
												value={values.gender}
												isValid={touched.gender && !errors.gender}
											>
												<option>--Gender--</option>
												<option>MALE</option>
												<option>FEMALE</option>
											</Form.Control>
											{errors.gender && touched.gender ? (
												<div style={{ color: 'red' }}>{errors.gender}</div>
											) : null}
										</Col>
										<Col>
											<Form.Label>Phone Number</Form.Label>
											<InputGroup className="mb-3">
												<InputGroup.Prepend className="contact">
													<InputGroup.Text>+84</InputGroup.Text>
												</InputGroup.Prepend>
												<Form.Control
													type="string"
													placeholder="Write your phone number"
													name="phoneNumber"
													onChange={handleChange}
													onBlur={handleBlur}
													value={values.phoneNumber}
													isValid={touched.phoneNumber && !errors.phoneNumber}
												/>
												{errors.phoneNumber && touched.phoneNumber ? (
													<div style={{ color: 'red' }}>
														{errors.phoneNumber}
													</div>
												) : null}
											</InputGroup>
										</Col>
									</Row>
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
								<Form.Group controlId="formConfirmPassword">
									<Form.Label>Confirm Password</Form.Label>
									<Form.Control
										name="confirmPassword"
										type="password"
										placeholder="Confirm your password"
										onChange={handleChange}
										onBlur={handleBlur}
										value={values.confirmPassword}
									/>
									{errors.confirmPassword && touched.confirmPassword ? (
										<p style={{ color: 'red' }}>{errors.confirmPassword}</p>
									) : null}
								</Form.Group>
								{this.state.isLoading === false ? (
									<Button
										variant="primary"
										type="submit"
										block
										onClick={handleSubmit}
									>
										Join for free now
									</Button>
								) : (
									<Spinner animation="border" variant="primary" />
								)}
								<p className="text-center pt-3">
									Do you already have an account?
									<Link to="/login"> Log in</Link>
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
const mapDispatchToProps = { register };

export default connect(mapStateToProps, mapDispatchToProps)(SignUp);
