import React, { Component } from 'react';
import { Card, Col, Form, Row, Spinner } from 'react-bootstrap';
import { Formik } from 'formik';
import { connect } from 'react-redux';
import { ButtonLeft } from '../../common';
import {
	getUserDetail,
	getUserDetailById,
	changePassword,
} from '../../../service/actions/user';

class PrivacyInfo extends Component {
	state = {
		show: false,
		message: '',
		isLoading: false,
	};

	submitData = async (values) => {
		this.setState({ isLoading: true });
		await this.props.changePassword({
			oldPassword: values.oldPassword,
			newPassword: values.newPassword,
			confirmPassword: values.confirmPassword,
		});
		this.setState({ show: true, isLoading: false });
	};

	render() {
		return (
			<div className="pt-4">
				<Formik
					initialValues={{
						oldPassword: '',
						newPassword: '',
						confirmPassword: '',
					}}
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
							<div className="pt-4">
								<Card>
									<Card.Body>
										<p>Account and Privacy</p>
										<hr />
										<Form.Group>
											<Row>
												<Col>
													<Form.Label>Old Password</Form.Label>
													<Form.Control
														type="password"
														placeholder="Write your old password"
														name="oldPassword"
														onChange={handleChange}
														onBlur={handleBlur}
														value={values.oldPassword}
													/>
												</Col>
												<Col>
													<Form.Label>New Password</Form.Label>
													<Form.Control
														type="password"
														placeholder="Write your new password"
														name="newPassword"
														onChange={handleChange}
														onBlur={handleBlur}
														value={values.newPassword}
													/>
												</Col>
												<Col>
													<Form.Label>Confirm Password</Form.Label>
													<Form.Control
														type="password"
														placeholder="Confirm your password"
														name="confirmPassword"
														onChange={handleChange}
														onBlur={handleBlur}
														value={values.confirmPassword}
													/>
												</Col>
											</Row>
										</Form.Group>
									</Card.Body>
								</Card>
								{this.state.isLoading === false ? (
									<ButtonLeft
										gobuttonleft="/profile"
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

const mapDispatchToProps = { getUserDetail, getUserDetailById, changePassword };

export default connect(mapStateToProps, mapDispatchToProps)(PrivacyInfo);
