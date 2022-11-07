import React, { Component } from 'react';
import {
	Card,
	Col,
	InputGroup,
	Form,
	Row,
	Spinner,
	Alert,
} from 'react-bootstrap';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { connect } from 'react-redux';
import ButtonLeft from '../splitpanel/ButtonLeft';
import {
	getUserDetail,
	getUserDetailById,
	updateUser,
} from '../../redux/actions/user';

const ValidatorSchema = Yup.object().shape({
	password: Yup.string()
		.min(1, ({ min }) => `Password must be at least ${min} characters`)
		.required('Password is required'),
	confirmPassword: Yup.string()
		.test('passwords-match', 'Passwords must match', function (value) {
			return this.parent.password === value;
		})
		.required('Confirm password is required'),
});

class DetailInfo extends Component {
	state = {
		show: false,
		message: '',
		isLoading: false,
	};
	async componentDidMount() {
		await this.props.getUserDetail(this.props.auth.token).then(async () => {
			localStorage.setItem('userId', this.props.user.detail.id);
			await this.props.getUserDetailById(localStorage.getItem('userId'));
			sessionStorage.setItem('firstName', this.props.user.detail.firstName);
			sessionStorage.setItem('lastName', this.props.user.detail.lastName);
			sessionStorage.setItem('phoneNumber', this.props.user.detail.phoneNumber);
			sessionStorage.setItem('email', this.props.user.detail.email);
			sessionStorage.setItem('password', this.props.user.detail.password);
			sessionStorage.setItem('gender', this.props.user.detail.gender);
		});
	}
	submitData = async (values) => {
		const userId = localStorage.getItem('userId');
		this.setState({ isLoading: true });
		await this.props.updateUser(userId, {
			firstName: values.firstName,
			lastName: values.lastName,
			phoneNumber: values.phoneNumber,
			email: values.email,
			password: values.password,
			gender: values.gender,
		});
		this.setState({ show: true, isLoading: false });
	};
	render() {
		const { show } = this.state;
		return (
			<div className="pt-4">
				{show === true && (
					<Alert
						className="pb-0"
						variant="danger"
						onClose={() => this.setState({ show: false })}
						dismissible
					>
						<p>
							{this.props.user.message !== undefined
								? this.props.user.message
								: this.props.user.errorMsg}
						</p>
					</Alert>
				)}
				{show === true && console.log(show.message)}
				<Formik
					initialValues={{
						firstName: sessionStorage.getItem('firstName'),
						lastName: sessionStorage.getItem('lastName'),
						phoneNumber: sessionStorage.getItem('phoneNumber'),
						email: sessionStorage.getItem('email'),
						password: '',
						confirmPassword: '',
						gender: sessionStorage.getItem('gender'),
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
						isSubmitting,
					}) => (
						<Form.Group>
							<Card>
								<Card.Body>
									<p>Details Information</p>
									<hr />
									<Form.Group>
										<Row className="mb-3">
											<Col>
												<Form.Label>First Name</Form.Label>
												<Form.Control
													readOnly
													type="text"
													placeholder="Write your first name"
													name="firstName"
													onChange={handleChange}
													onBlur={handleBlur}
													value={values.firstName}
												/>
											</Col>
											<Col>
												<Form.Label>Last Name</Form.Label>
												<Form.Control
													readOnly
													type="text"
													placeholder="Write your last name"
													name="lastName"
													onChange={handleChange}
													onBlur={handleBlur}
													value={values.lastName}
												/>
											</Col>
										</Row>
										<Row className="mb-3">
											<Col>
												<Form.Label>E-mail</Form.Label>
												<Form.Control
													readOnly
													type="email"
													placeholder="Write your email"
													name="email"
													onChange={handleChange}
													onBlur={handleBlur}
													value={values.email}
												/>
											</Col>
										</Row>
										<Row>
											<Col>
												<Form.Label>Gender</Form.Label>
												<Form.Control
													readOnly
													type="text"
													name="gender"
													defaultValue="Unspecified"
													onChange={handleChange}
													value={values.gender}
												></Form.Control>
											</Col>
											<Col>
												<Form.Label>Phone Number</Form.Label>
												<InputGroup className="mb-3">
													<InputGroup.Prepend className="contact">
														<InputGroup.Text>+84</InputGroup.Text>
													</InputGroup.Prepend>
													<Form.Control
														readOnly
														type="number"
														placeholder="Write your phone number"
														name="phoneNumber"
														onChange={handleChange}
														onBlur={handleBlur}
														value={values.phoneNumber}
													/>
												</InputGroup>
											</Col>
										</Row>
									</Form.Group>
								</Card.Body>
							</Card>
							<div className="pt-4">
								<Card>
									<Card.Body>
										<p>Account and Privacy</p>
										<hr />
										<Form.Group>
											<Row>
												<Col>
													<Form.Label>New Password</Form.Label>
													<Form.Control
														type="password"
														placeholder="Write your password"
														name="password"
														onChange={handleChange}
														onBlur={handleBlur}
														isValid={touched.password && !errors.password}
														value={values.password}
													/>
													{errors.password && touched.password ? (
														<p style={{ color: 'red' }}>{errors.password}</p>
													) : null}
												</Col>
												<Col>
													<Form.Label>Confirm Password</Form.Label>
													<Form.Control
														type="password"
														placeholder="Confirm your password"
														name="confirmPassword"
														onChange={handleChange}
														onBlur={handleBlur}
														isValid={
															touched.confirmPassword && !errors.confirmPassword
														}
														value={values.confirmPassword}
													/>
													{errors.confirmPassword && touched.confirmPassword ? (
														<p style={{ color: 'red' }}>
															{errors.confirmPassword}
														</p>
													) : null}
												</Col>
											</Row>
										</Form.Group>
									</Card.Body>
								</Card>
								{this.state.isLoading === false ? (
									<ButtonLeft
										gobuttonleft="/profile-page"
										buttontext="Update Change"
										type="submit"
										onClick={handleSubmit}
										disabled={isSubmitting}
									/>
								) : (
									<Spinner animation="border" variant="primary" />
								)}
							</div>
						</Form.Group>
					)}
				</Formik>
			</div>
		);
	}
}

const mapStateToProps = (state) => ({
	auth: state.auth,
	user: state.user,
});

const mapDispatchToProps = { getUserDetail, getUserDetailById, updateUser };

export default connect(mapStateToProps, mapDispatchToProps)(DetailInfo);
