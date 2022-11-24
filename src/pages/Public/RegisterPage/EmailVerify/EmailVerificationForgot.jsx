import React, { Component } from 'react';
import {
	Container,
	Row,
	Image,
	Button,
	ListGroup,
	Form,
	Spinner,
	Alert,
	Col,
} from 'react-bootstrap';
import { connect } from 'react-redux';
import { Formik } from 'formik';
import {
	emailVerifyForgot,
	forgetPassword,
} from '../../../../service/actions/auth';
import { getUserDetailById } from '../../../../service/actions/user';
import { LeftRegister, RightRegister } from '../../../../components/common';
import tickitz_white from '../../../../assets/images/tickitz-white.svg';
import { schemaYupEmailVerification } from '../../../../shared/constants/yupSchema';
import Countdown from 'react-countdown';
import { path } from '../../../../shared/constants/path';
import '../styles.css';

class EmailVerificationForgot extends Component {
	state = {
		show: true,
		message: '',
		isLoading: false,
	};

	async componentDidMount() {
		await this.props.getUserDetailById(sessionStorage.getItem('user'));
	}

	submitData = async (values) => {
		this.setState({ isLoading: true });
		await this.props.emailVerifyForgot(values.verifyCode);
		this.setState({ show: true, isLoading: false });
	};

	resendCode = async () => {
		this.setState({ isLoading: true });
		await this.props.forgetPassword(this.props.user.detail.email);
		this.setState({ show: true, isLoading: false });
	};

	renderer = ({ minutes, seconds, completed }) => {
		if (completed) {
			return (
				<Button
					onClick={() => this.resendCode()}
					variant="outline-primary"
					type="submit"
					block
					className="float-right col-12 col-md-5"
				>
					Resend code
				</Button>
			);
		} else {
			return (
				<Button
					variant="primary"
					type="loading"
					block
					disabled
					className="float-right col-12 col-md-5"
				>
					<Spinner
						as="span"
						animation="border"
						size="sm"
						role="status"
						aria-hidden="true"
					/>
					<span className="visually-hidden">
						{' '}
						{minutes}:{seconds}
					</span>
				</Button>
			);
		}
	};

	render() {
		const { show } = this.state;
		const { history } = this.props;
		return (
			<Container fluid>
				<Row>
					{/* Left Side */}
					<LeftRegister>
						<Container>
							<Image src={tickitz_white} width={250} />
							<p className="text-display-md-bold m-0 text-white pt-5">
								Lets verify your new account
							</p>
							<p className="text-lg text-white pb-3 opacity-70 ">
								To be able to use your account, please complete the following
								steps
							</p>
							<ListGroup>
								<li>
									<Button
										variant="outline-light"
										className="btn-sm rounded-circle"
									>
										1<div className="vertical-line"></div>
									</Button>
									<label className="form-check-label text-label-non-active text-white pb-3">
										<p className="pl-3 text-color-placeholder">
											Fill your additional details
										</p>
									</label>
								</li>
								<li>
									<Button
										variant="outline-light"
										className="btn-sm rounded-circle"
										active
									>
										2<div className="vertical-line"></div>
									</Button>
									<label className="form-check-label text-white pb-3">
										<p className="pl-3 ">Activate your account</p>
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
					{/* Right side */}
					<RightRegister>
						<Container>
							<Row className="justify-content-md-center">
								<p className="text-link-lg-48 m-0 pt-4">Verification</p>
								<p className="text-link-lg-26 pt-1 pb-2 m-0">
									Fill your complete code verification
								</p>
							</Row>
						</Container>
						{show === true && (
							<Alert
								className="pb-0"
								variant={this.props.auth.message !== '' ? 'success' : 'danger'}
								onClose={() => this.setState({ show: false, message: '' })}
								dismissible
							>
								<p>
									{this.props.auth.message !== ''
										? this.props.auth.message ===
										  'Please go to your email and get verification code to reset your password'
											? this.props.auth.message
											: ''
										: this.props.auth.errorMsg}
								</p>
							</Alert>
						)}
						{this.props.auth.message === 'Success'
							? history.push(path.signIn)
							: ''}
						<Formik
							initialValues={{
								verifyCode: '',
							}}
							validationSchema={schemaYupEmailVerification}
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
										<Form.Control
											name="verifyCode"
											type="text"
											placeholder="Enter your code verification"
											onChange={handleChange}
											onBlur={handleBlur}
											value={values.verifyCode}
										/>
										{errors.verifyCode && touched.verifyCode ? (
											<div style={{ color: 'red' }}>{errors.verifyCode}</div>
										) : null}
									</Form.Group>
									<Row>
										<Col>
											{this.state.isLoading === false ? (
												<Container className="pt-3" fluid>
													<Row className="justify-content-md-center">
														<Button
															onClick={handleSubmit}
															variant="outline-primary"
															type="submit"
															block
															className="float-left col-12 col-md-5"
														>
															Activate now
														</Button>
														<Col></Col>
														<Countdown
															date={Date.now() + 60000}
															intervalDelay={0}
															precision={3}
															renderer={this.renderer}
														/>
													</Row>
												</Container>
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
										</Col>
									</Row>
								</Form.Group>
							)}
						</Formik>
					</RightRegister>
				</Row>
			</Container>
		);
	}
}

const mapStateToProps = (state) => ({
	auth: state.auth,
	user: state.user,
});
const mapDispatchToProps = {
	emailVerifyForgot,
	forgetPassword,
	getUserDetailById,
};

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(EmailVerificationForgot);
