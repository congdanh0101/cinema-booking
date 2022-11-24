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
import {
	getUserDetail,
	getUserDetailById,
	updateUser,
	changePassword,
} from '../../../service/actions/user';

class DetailInfo extends Component {
	state = {
		show: false,
		message: '',
		isLoading: false,
	};

	submitData = async (values) => {
		this.setState({ isLoading: true });
		await this.props.updateUser(this.props.user.detail.id, {
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
						oldPassword: '',
						newPassword: '',
						confirmPassword: '',
						gender: sessionStorage.getItem('gender'),
					}}
					onSubmit={(values) => {
						this.changePassword(values);
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
							{this.state.isLoading === false ? (
								<Button
									className="mt-3"
									variant="outline-primary"
									type="submit"
									block
									onClick={handleSubmit}
									disabled={isSubmitting}
								>
									Update Change
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
			</div>
		);
	}
}

const mapStateToProps = (state) => ({
	auth: state.auth,
	user: state.user,
});

const mapDispatchToProps = {
	getUserDetail,
	getUserDetailById,
	updateUser,
	changePassword,
};

export default connect(mapStateToProps, mapDispatchToProps)(DetailInfo);
