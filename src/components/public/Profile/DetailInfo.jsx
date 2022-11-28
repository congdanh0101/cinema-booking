import React, { Component } from 'react';
import {
	Card,
	Col,
	InputGroup,
	Form,
	Row,
	Spinner,
	Alert,
	Button,
} from 'react-bootstrap';
import { Formik } from 'formik';
import { connect } from 'react-redux';
import CloseButton from 'react-bootstrap/CloseButton';
import { updateUser } from '../../../service/actions/user';
import { schemaUser } from '../../../shared/constants/yupSchema';

class DetailInfo extends Component {
	state = {
		show: false,
		message: '',
		isLoading: false,
		user: JSON.parse(sessionStorage.getItem('user')),
		isUpdating: false,
	};

	handleToggleUpdate = async () => {
		this.setState((prevState) => ({ isUpdating: !prevState.isUpdating }));
	};

	handleClose = () => {
		this.setState({ isUpdating: false });
	};

	submitData = async (values) => {
		this.setState({ isLoading: true });
		await this.props.updateUser(this.state.user.id, {
			firstName: values.firstName,
			lastName: values.lastName,
			phoneNumber: values.phoneNumber,
			email: values.email,
			password: values.password,
			gender: values.gender,
		});
		this.setState({ show: true, isLoading: false, isUpdating: false });
	};

	render() {
		const { show, user } = this.state;
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
				{this.state.isUpdating === false ? (
					<Formik
						initialValues={{
							firstName: user.firstName,
							lastName: user.lastName,
							phoneNumber: user.phoneNumber,
							email: user.email,
							password: user.password,
							gender: user.gender,
						}}
						onSubmit={this.handleToggleUpdate}
					>
						{({ values, handleSubmit }) => (
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
														name="firstName"
														value={values.firstName}
													/>
												</Col>
												<Col>
													<Form.Label>Last Name</Form.Label>
													<Form.Control
														readOnly
														type="text"
														name="lastName"
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
														name="email"
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
															name="phoneNumber"
															value={values.phoneNumber}
														/>
													</InputGroup>
												</Col>
											</Row>
										</Form.Group>
									</Card.Body>
								</Card>
								<Button
									className="mt-3"
									variant="outline-primary"
									type="submit"
									block
									onClick={handleSubmit}
								>
									Update Changes
								</Button>
							</Form.Group>
						)}
					</Formik>
				) : (
					<Formik
						initialValues={{
							firstName: user.firstName,
							lastName: user.lastName,
							phoneNumber: user.phoneNumber,
							email: user.email,
							password: user.password,
							gender: user.gender,
						}}
						validationSchema={schemaUser}
						onSubmit={(values) => {
							this.submitData(values).then(async () => {
								sessionStorage.setItem('user', JSON.stringify(this.props.user));
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
								<Card>
									<Card.Body>
										<p>
											Details Information
											<CloseButton variant="white" onClick={this.handleClose} />
										</p>
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
													/>
													{errors.firstName && touched.firstName ? (
														<div style={{ color: 'red' }}>
															{errors.firstName}
														</div>
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
													/>
													{errors.lastName && touched.lastName ? (
														<div style={{ color: 'red' }}>
															{errors.lastName}
														</div>
													) : null}
												</Col>
											</Row>
											<Row className="mb-3">
												<Col>
													<Form.Label>E-mail</Form.Label>
													<Form.Control
														readOnly
														type="email"
														name="email"
														value={values.email}
													/>
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
														<InputGroup.Text className="contact">
															+84
														</InputGroup.Text>
														<Form.Control
															type="string"
															placeholder="Write your phone number"
															name="phoneNumber"
															onChange={handleChange}
															onBlur={handleBlur}
															value={values.phoneNumber}
														/>
														{errors.phoneNumber && touched.phoneNumber ? (
															<div style={{ color: 'red' }}>
																{errors.phoneNumber}
															</div>
														) : null}
													</InputGroup>
												</Col>
											</Row>
										</Form.Group>
									</Card.Body>
								</Card>
								{this.state.isLoading === false ? (
									<Button
										className="mt-3"
										variant="outline-primary"
										type="submit"
										block
										onClick={handleSubmit}
									>
										Save changes
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
							</Form.Group>
						)}
					</Formik>
				)}
			</div>
		);
	}
}

const mapStateToProps = (state) => ({
	auth: state.auth,
	user: state.user,
});

const mapDispatchToProps = {
	updateUser,
};

export default connect(mapStateToProps, mapDispatchToProps)(DetailInfo);
