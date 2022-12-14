import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Button, Card, Col, Spinner } from 'react-bootstrap';
import { Link, withRouter } from 'react-router-dom';
import BookingSeating from './BookingSeating';
import {
	selectSeat,
	getAllSeatsAvailableByShowtime,
} from '../../../service/actions/seat';
import { createOrder } from '../../../service/actions/order';
import { addManyTickets } from '../../../service/actions/ticket';
import { path } from '../../../shared/constants/path';
import './styles.css';

class OrderSeat extends Component {
	state = {
		isLoading: false,
		selectShowtime: JSON.parse(sessionStorage.getItem('selectShowtime')),
	};
	async componentDidMount() {
		const { seat, getAllSeatsAvailableByShowtime } = this.props;
		const { selectShowtime } = this.state;
		if (!seat.length) await getAllSeatsAvailableByShowtime(selectShowtime.id);
	}
	handleClickSeat = (seat) => {
		const { selectSeat } = this.props;
		selectSeat(seat);
	};
	handleCheckOut = () => {
		const { history, ticket, order } = this.props;
		const { selectShowtime } = this.state;
		this.setState({ isLoading: true });
		this.props
			.addManyTickets(selectShowtime.id, this.props.selectedSeats)
			.then(() => {
				let order = ticket.map((ticket) => {
					return { ticket: ticket };
				});
				this.props.createOrder(order);
			});
		this.setState({ isLoading: false });
		sessionStorage.setItem('order', JSON.stringify(order.details));
		sessionStorage.setItem('ticket', JSON.stringify(ticket));
		history.push(path.payment);
	};
	render() {
		const { selectShowtime } = this.state;
		const { seat, selectedSeats } = this.props;
		console.log(this.props);
		return (
			<Col xs={12} lg="auto">
				<p className="text-display-xs-bold">Choose Your Seat</p>
				<Card className="border-0 p-5 order-seat">
					<Card.Body className="row text-center">
						<Col xs={12}>
							<p className="text-link-xs">Screen</p>
							<div className="line-screen"></div>
						</Col>
					</Card.Body>
					<Card.Body>
						<BookingSeating
							seats={seat.seats}
							isSelecting={selectedSeats}
							onClickSeat={this.handleClickSeat}
						/>
					</Card.Body>
				</Card>
				<div className="pt-4 checkout">
					<Link to={`/movie-detail/${selectShowtime.movie.id}`}>
						<Button
							variant="outline-primary"
							className="float-left col-12 col-md-5"
						>
							Change showtimes
						</Button>
					</Link>
					{this.state.isLoading === false ? (
						selectedSeats.length > 0 ? (
							<Button
								variant="primary shadow"
								className="float-right col-12 col-md-5"
								onClick={this.handleCheckOut}
							>
								Checkout now
							</Button>
						) : (
							<Button
								variant="primary shadow"
								className="float-right col-12 col-md-5"
								onClick={this.handleCheckOut}
								disabled
							>
								Checkout now
							</Button>
						)
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
			</Col>
		);
	}
}

const mapStateToProps = (state) => ({
	order: state.order,
	seat: state.seat,
	ticket: state.ticket.tickets,
	selectedSeats: state.seat.selectedSeats,
});

const mapDispatchToProps = {
	selectSeat,
	createOrder,
	getAllSeatsAvailableByShowtime,
	addManyTickets,
};

export default withRouter(
	connect(mapStateToProps, mapDispatchToProps)(OrderSeat)
);
