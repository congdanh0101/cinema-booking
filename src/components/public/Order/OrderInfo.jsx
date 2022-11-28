import React, { Component } from 'react';
import { Card, Col, Image } from 'react-bootstrap';
import Moment from 'react-moment';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { createOrder, getOrderById } from '../../../service/actions/order';

class OrderInfo extends Component {
	state = {
		selectShowtime: JSON.parse(sessionStorage.getItem('selectShowtime')),
	};

	render() {
		const { selectShowtime } = this.state;
		return (
			<Col xs={12} lg={4}>
				<p className="text-display-xs-bold">Order Info</p>
				<Card className="border-0 shadow order-seat">
					<Card.Body className="pb-0">
						{/* <div className="text-center">
							<Image src={selectShowtime.picture} height={40} alt="" />
							<p className="text-link-lg pt-2">{selectShowtime.cinema}</p>
						</div> */}
						<div className="d-flex justify-content-between">
							<p className="text-xs text-color-label">Movie selected</p>
							<p className="text-right text-link-xs text-color-title">
								{selectShowtime.movie.name}
							</p>
						</div>
						<div className="d-flex justify-content-between">
							<p className="text-xs text-color-label">
								<Moment format="DD MMMM YYYY">{selectShowtime.release}</Moment>
							</p>
							<p className="text-right text-link-xs text-color-title">
								{selectShowtime.timeStart}
							</p>
						</div>
						<div className="d-flex justify-content-between">
							<p className="text-xs text-color-label">One ticket price</p>
							<p className="text-right text-link-xs text-color-title">
								${selectShowtime.price}
							</p>
						</div>
						{/* <div className="d-flex justify-content-between">
							<p className="text-xs text-color-label">Seat choosed</p>
							<p className="text-right text-link-xs text-color-title">
								{this.props.order.seatOrder + ''}
							</p>
						</div> */}
					</Card.Body>
					<hr />
					<Card.Body className="pt-0">
						<p className="float-left text-link-md">Total Payment</p>
						<p className="float-end text-display-xs-bold text-primary text-right">
							{/* ${selectShowtime.price * this.props.order.seatOrder.length} */}
						</p>
					</Card.Body>
				</Card>
			</Col>
		);
	}
}

const mapStateToProps = (state) => ({
	order: state.order,
});
const mapDispatchToProps = { createOrder, getOrderById };

export default withRouter(
	connect(mapStateToProps, mapDispatchToProps)(OrderInfo)
);
