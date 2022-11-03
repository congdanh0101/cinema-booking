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
import LeftRegister from '../../components/register/LeftRegister';
import RightRegister from '../../components/register/RightRegister';
import tickitz_white from '../../assets/images/tickitz-white.svg';
import { connect } from 'react-redux';
import { Formik } from 'formik';
import { emailVerify, register } from '../../redux/actions/auth';
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
		email: '',
		password: '',
	};
	submitData = async (values) => {
		this.setState({ isLoading: true });
		await this.props.emailVerify(values.code);
		// await this.props.login(
		// 	this.props.auth.data.email,
		// 	this.props.auth.data.password
		// );
		this.setState({ show: true, isLoading: false });
	};

	render() {
		const { show } = this.state;
		console.log(this.props);
		return (
			<Row className="container-fluid">
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
					<p className="text-link-lg-26 pt-3 m-0">
						Fill your complete code verification
					</p>
					<p className="opacity-70 text-md pb-4 m-0">
						we'll send a link to your email shortly
					</p>
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
							code: '',
						}}
						validationSchema={ValidatorSchema}
						onSubmit={(values) => {
							this.submitData(values);
						}}
					>
						{({ values, errors, touched, handleChange, handleSubmit }) => (
							<Form.Group>
								<Form.Group controlId="formBasicEmail">
									<Form.Label>Verify Code</Form.Label>
									<Form.Control
										name="code"
										type="text"
										placeholder="Input your code here"
										onChange={handleChange}
										value={values.code}
									/>
									{errors.code && touched.code ? (
										<p style={{ color: 'red' }}>{errors.code}</p>
									) : null}
								</Form.Group>
								{this.state.isLoading === false ? (
									<Button
										variant="primary"
										type="submit"
										block
										onClick={handleSubmit}
									>
										Activate now
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
const mapDispatchToProps = { emailVerify, register };

export default connect(mapStateToProps, mapDispatchToProps)(EmailVerification);
