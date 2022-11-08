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
} from 'react-bootstrap';
import LeftRegister from '../../../components/register/LeftRegister';
import RightRegister from '../../../components/register/RightRegister';
import tickitz_white from '../../../assets/images/tickitz-white.svg';
import { connect } from 'react-redux';
import { resetPassword } from '../../../service/actions/auth';
import { Formik } from 'formik';
import * as Yup from 'yup';
import './styles.css';

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

class ResetPassword extends Component {
	state = {
		show: false,
		message: '',
		isLoading: false,
	};
	submitData = async (values) => {
		this.setState({ isLoading: true });
		await this.props.resetPassword(values.code);
		this.setState({ show: true, isLoading: false });
	};
	render() {
		const { show } = this.state;
		return (
			<Row className="container-fluid">
				{/* Left Side */}
				<LeftRegister>
					<Container>
						<Image src={tickitz_white} width={250} />
						<p className="text-display-md-bold m-0 text-white pt-5">
							Lets reset your password
						</p>
						<p className="text-lg text-white pb-3 opacity-70 ">
							To be able to use your account again, please complete the
							following steps
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
									<p className="pl-3">Fill your new passwords</p>
								</label>
							</li>
							<li>
								<Button
									variant="outline-light"
									className="btn-sm rounded-circle"
								>
									2
								</Button>
								<label className="form-check-label text-label-non-active text-white pb-3">
									<p className="pl-3 text-color-placeholder">Done</p>
								</label>
							</li>
						</ListGroup>
					</Container>
				</LeftRegister>
				{/* Right side */}
				<RightRegister>
					<p class="text-link-lg-26 pt-3 m-0">Fill your new passwords</p>
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
					<Formik
						initialValues={{
							newPassword: '',
							confirmPassword: '',
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
										Confirm
									</Button>
								) : (
									<Spinner animation="border" variant="primary" />
								)}
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
const mapDispatchToProps = { resetPassword };

export default connect(mapStateToProps, mapDispatchToProps)(ResetPassword);
