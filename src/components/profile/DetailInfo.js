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
import { getUserDetail, updateUser } from '../../redux/actions/user';

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
	email: Yup.string().email('Invalid email').required('Required'),
});

class DetailInfo extends Component {
	state = {
		show: false,
		message: '',
		isLoading: false,
	};
	async componentDidMount() {
		await this.props.getUserDetail(this.props.auth.token);
		localStorage.setItem('userId', this.props.user.detail.id);
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
						firstName: '',
						lastName: '',
						phoneNumber: '',
						email: '',
						gender: this.props.user.detail.gender,
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
										<Row className="mb-3">
											<Col>
												<Form.Label>E-mail</Form.Label>
												<Form.Control
													type="email"
													placeholder="Write your email"
													name="email"
													onChange={handleChange}
													onBlur={handleBlur}
													value={values.email}
													isValid={touched.email && !errors.email}
												/>
												{errors.email && touched.email ? (
													<div style={{ color: 'red' }}>{errors.email}</div>
												) : null}
											</Col>
										</Row>
										<Row>
											<Col>
												<Form.Label>Gender</Form.Label>
												<Form.Control
													readOnly
													type="gender"
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
														type="number"
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
										{this.state.isLoading === false ? (
											<ButtonLeft
												buttontext="Update Change"
												type="submit"
												onClick={handleSubmit}
												disabled={isSubmitting}
											/>
										) : (
											<Spinner animation="border" variant="primary" />
										)}
									</Form.Group>
								</Card.Body>
							</Card>
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

const mapDispatchToProps = { getUserDetail, updateUser };

export default connect(mapStateToProps, mapDispatchToProps)(DetailInfo);
