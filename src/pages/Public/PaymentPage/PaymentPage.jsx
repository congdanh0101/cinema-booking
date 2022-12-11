import React, { Component } from 'react';
import { connect } from 'react-redux';
import { PayInfo, PayMethod, PersonalInfo } from '../../../components/public';
import { Button, Spinner } from 'react-bootstrap';
import { Link, withRouter } from 'react-router-dom';
import { PanelLeft, PanelRight } from '../../../components/common';
import { path } from '../../../shared/constants/path';
import axios from 'axios';
import { index, pay } from '../../../service/actions/payment';
import axiosClient from '../../../shared/apis/axiosClient2';

class PaymentPage extends Component {
	state = {
		isLoading: false,
		selectShowtime: JSON.parse(sessionStorage.getItem('selectShowtime')),
	};
	openLink = (url) => window.open(url, '_blank')?.focus();
	async componentDidMount() {
		//const response = await axiosClient().get(`${78}`);
		// await this.openLink('http://localhost:8888/78');
	}
	handlePayment = () => {
		this.setState({ isLoading: true });
		this.openLink('http://localhost:8888/78');
		// const path = ` http://localhost:8888/pay?price=${30}`;
		// axios(path, {
		// 	method: 'POST',
		// 	headers: {
		// 		'Access-Control-Allow-Credentials': true,
		// 		'Content-Type': 'application/json',
		// 	},
		// });
		this.setState({ isLoading: false });
	};
	render() {
		return (
			<div>
				<PanelLeft title="Payment Info" body={<PayInfo />}>
					<PanelRight title="Personal Info" body={<PersonalInfo />} />
				</PanelLeft>
				<PanelLeft
					title="Payment Method"
					body={<PayMethod />}
					panel={
						<div className="pt-4 checkout">
							<Link to={path.order}>
								<Button
									variant="outline-primary"
									className="float-left col-12 col-md-5"
								>
									Previous page
								</Button>
							</Link>
							{this.state.isLoading === false ? (
								<Button
									variant="outline-primary"
									block
									className="float-right col-12 col-md-5"
									onClick={this.handlePayment}
								>
									Pay your order
								</Button>
							) : (
								<Button
									variant="primary shadow"
									className="float-right col-12 col-md-5"
									type="loading"
									block
									disabled
								>
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
						</div>
					}
				></PanelLeft>
			</div>
		);
	}
}

const mapStateToProps = (state) => ({
	payment: state.payment,
	order: state.order.details,
});

const mapDispatchToProps = {
	index,
	pay,
};

export default withRouter(
	connect(mapStateToProps, mapDispatchToProps)(PaymentPage)
);
