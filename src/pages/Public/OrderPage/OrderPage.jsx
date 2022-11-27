import React, { Component } from 'react';
import { Button, Container, Navbar, Row } from 'react-bootstrap';
import { Link, withRouter } from 'react-router-dom';
import { OrderInfo, OrderSeat } from '../../../components/public';
import './styles.css';
import { connect } from 'react-redux';
import { createOrder, getOrderById } from '../../../service/actions/order';

class OrderPage extends Component {
	state = {
		selectShowtime: {},
	};

	componentDidMount() {
		const { selectShowtime } = this.props;
		this.setState({ selectShowtime: selectShowtime });
	}

	render() {
		const { selectShowtime } = this.props;

		console.log(this.props);

		console.log(this.state);

		return (
			<div>
				<Navbar className="navbar-expand-lg navbar-dark bg-primary ">
					<Container>
						<Container fluid>
							<Link
								to={`/movie-detail/${selectShowtime.movie.id}`}
								className="text-link-lg text-white"
							>
								{selectShowtime.movie.name}
							</Link>
							<Link to="/" className="ml-auto">
								<Button
									variant="light"
									className="opacity-80 rounded-pill ms-auto py-2 px-3 text-primary text-display-xs-bold-14 "
								>
									Change movie
								</Button>
							</Link>
						</Container>
					</Container>
				</Navbar>
				<div className="bg-gray">
					<Container>
						<Row>
							<OrderSeat />
							<OrderInfo />
						</Row>
					</Container>
				</div>
			</div>
		);
	}
}

const mapStateToProps = (state) => ({
	order: state.order,
	selectShowtime: state.showtime.selectShowtime,
});
const mapDispatchToProps = { createOrder, getOrderById };

export default withRouter(
	connect(mapStateToProps, mapDispatchToProps)(OrderPage)
);
