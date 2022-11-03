import React, { Component } from 'react';
import { Card, Col, InputGroup, Form, Row } from 'react-bootstrap';
import ButtonLeft from '../splitpanel/ButtonLeft';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { connect } from 'react-redux';
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
	gender: Yup.string().required('Required'),
	phoneNumber: Yup.number()
		.min(2, 'Too Short!')
		.max(30, 'Too Long!')
		.required('Required'),
	email: Yup.string().email('Invalid email').required('Required'),
});

class DetailInfo extends Component {
	state = {
		show: true,
		message: '',
	};
	update = async (values) => {
		const { token } = this.props.auth;
		await this.props.updateUser(token, {
			firstName: values.firstName,
			lastName: values.lastName,
			phoneNumber: values.phoneNumber,
			email: values.email,
			password: values.password,
			gender: values.gender,
		});
		if (this.props.user.errorMsg === '') {
			console.log('sukses');
		} else {
			console.log('gagal');
		}
	};
	async componentDidMount() {
		await this.props.getUserDetail(this.props.auth.token);
	}
	render() {
		const { user } = this.props;
		return (
			<div className="pt-4">
				<Formik
					initialValues={{
						firstName: user.detail.firstName,
						lastName: user.detail.lastName,
						phoneNumber: user.detail.phoneNumber,
						email: user.detail.email,
						gender: user.detail.gender,
					}}
					validationSchema={ValidatorSchema}
					onSubmit={(values) => {
						this.update(values);
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
						<Form.Group onSubmit={handleSubmit}>
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
										<Row>
											<Col>
												<Form.Label>Gender</Form.Label>
												<Form.Control
													type="gender"
													placeholder="Write your gender"
													name="gender"
													onChange={handleChange}
													onBlur={handleBlur}
													value={values.gender}
													isValid={touched.gender && !errors.gender}
												/>
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
										<Row>
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
									</Form.Group>
								</Card.Body>
							</Card>
							<div className="pt-2">
								{/* <Alert
									className="mt-4"
									variant="danger"
									onClose={() => this.setState({ show: this.state.show })}
									dismissible
								>
									<Alert.Heading>Oh snap! You got an error!</Alert.Heading>
									<p>
										Change this and that and try again.
									</p>
								</Alert> */}
								<ButtonLeft
									buttonText="Update Change"
									type="submit"
									disabled={isSubmitting}
								/>
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

const mapDispatchToProps = { getUserDetail, updateUser };

export default connect(mapStateToProps, mapDispatchToProps)(DetailInfo);
