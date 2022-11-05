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
import ReactCodeInput from 'react-code-input';
import { connect } from 'react-redux';
import { Formik } from 'formik';
import { emailVerify, login } from '../../redux/actions/auth';
import LeftRegister from '../../components/register/LeftRegister';
import RightRegister from '../../components/register/RightRegister';
import tickitz_white from '../../assets/images/tickitz-white.svg';
// import ButtonLeft from '../../components/splitpanel/ButtonLeft';
import ButtonPanel from '../../components/splitpanel/ButtonPanel';
import './styles.css';
import * as Yup from 'yup';

const ValidatorSchema = Yup.object().shape({
	code: Yup.string().required('Required'),
});

class EmailVerification extends Component {
	state = {
		show: false,
		message: '',
		isLoading: false,
	};

	submitData = async (values) => {
		this.setState({ isLoading: true });
		await this.props.emailVerify(values.code);
		this.setState({ show: true, isLoading: false });
		window.alert('Success! Go to login');
	};

	render() {
		const { show } = this.state;
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
								<p className="text-link-lg-26 pt-3 m-0">
									Fill your complete code verification
								</p>
							</Row>
							<Row className="justify-content-md-center">
								<p className="opacity-70 text-md pb-4 m-0">
									we'll send a link to your email shortly
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
										? this.props.auth.message !== sessionStorage.getItem('show')
											? sessionStorage.getItem('show')
											: this.props.auth.message
										: this.props.auth.errorMsg}
								</p>
							</Alert>
						)}

						<Formik
							initialValues={{
								code: '',
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
								handleSubmit,
								isSubmitting,
							}) => (
								<Form.Group>
									<Row className="justify-content-md-center">
										<Form.Label className="text-md pb-2 m-0">
											Verify Code
										</Form.Label>
									</Row>
									<Row className="justify-content-md-center">
										<ReactCodeInput
											type="text"
											onChange={handleChange}
											value={values.code}
											fields={8}
										/>
										{errors.code && touched.code ? (
											<p style={{ color: 'red' }}>{errors.code}</p>
										) : null}
									</Row>
									<Row>
										<Col>
											{this.state.isLoading === false ? (
												<ButtonPanel
													gobuttonleft="/login"
													buttonleft="Activate now"
													gobuttonright="/sign-up"
													buttonright="Resend code"
													type="submit"
													onClick={handleSubmit}
													disabled={isSubmitting}
												/>
											) : (
												<Spinner animation="border" variant="primary" />
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
});
const mapDispatchToProps = { emailVerify, login };

export default connect(mapStateToProps, mapDispatchToProps)(EmailVerification);
