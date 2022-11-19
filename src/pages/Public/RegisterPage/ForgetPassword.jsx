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
} from 'react-bootstrap';
import { LeftRegister, RightRegister } from '../../../components/common';
import tickitz_white from '../../../assets/images/tickitz-white.svg';
import { connect } from 'react-redux';
import { Formik } from 'formik';
import { forgetPassword } from '../../../service/actions/auth';
import { schemaYupEmail } from '../../../shared/constants/yupSchema';
import { path } from '../../../shared/constants/path';
import './styles.css';
class ForgetPassword extends Component {
	state = {
		show: false,
		message: '',
		isLoading: false,
	};
	submitData = async (values) => {
		this.setState({ isLoading: true });
		await this.props.forgetPassword(values.email);
		this.setState({ show: true, isLoading: false });
		sessionStorage.setItem('message', this.props.auth.message);
	};

	render() {
		const { history } = this.props;
		const { show } = this.state;
		return (
			<Row className="container-fluid">
				{/* Left Side */}
				<LeftRegister>
					<Container>
						<Image src={tickitz_white} width={250} />
						<p className="text-display-md-bold m-0 text-white pt-5">
							Lets get back your account
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
									<p className="pl-3 ">Input your email</p>
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
					<p className="text-link-lg-48 m-0 pt-3">Forget Password</p>
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
					{show === true &&
					this.props.auth.message === sessionStorage.getItem('message')
						? history.push(path.emailVerifyForgot)
						: ''}
					<Formik
						initialValues={{
							email: '',
						}}
						validationSchema={schemaYupEmail}
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
								<Form.Group controlId="formBasicEmail">
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
				</RightRegister>
			</Row>
		);
	}
}

const mapStateToProps = (state) => ({
	auth: state.auth,
});
const mapDispatchToProps = { forgetPassword };

export default connect(mapStateToProps, mapDispatchToProps)(ForgetPassword);
