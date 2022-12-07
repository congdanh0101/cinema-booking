import React, { Component } from 'react';
import { connect } from 'react-redux';
import { PayInfo, PayMethod, PersonalInfo } from '../../../components/public';
import { Button, Spinner } from 'react-bootstrap';
import { Link, withRouter } from 'react-router-dom';
import { PanelLeft, PanelRight } from '../../../components/common';
import { path } from '../../../shared/constants/path';
import { index } from '../../../service/actions/payment';

class PaymentPage extends Component {
	state = {
		isLoading: false,
		selectShowtime: JSON.parse(sessionStorage.getItem('selectShowtime')),
	};
	async componentDidMount() {
		const { payment, index, order } = this.props;
		if (!payment.length) await index(order.id);
	}
	handlePayment = async () => {
		const { selectShowtime } = this.state;
		this.setState({ isLoading: true });
		await this.props.addManyTickets(
			selectShowtime.id,
			this.props.selectedSeats
		);
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
	order: state.order,
});

const mapDispatchToProps = {
	index,
};

export default withRouter(
	connect(mapStateToProps, mapDispatchToProps)(PaymentPage)
);
