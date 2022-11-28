import React, { Component } from 'react';
import { Button, Card, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import Seat from './Seat2';
import { path } from '../../../shared/constants/path';
import './styles.css';

export default class OrderSeat extends Component {
	state = {
		selectShowtime: JSON.parse(sessionStorage.getItem('selectShowtime')),
	};
	render() {
		const { selectShowtime } = this.state;
		return (
			<Col xs={12} lg="auto">
				<p className="text-display-xs-bold">Choose Your Seat</p>
				<Card className="border-0 p-5 order-seat">
					<Card.Body className="row text-center">
						<Col xs={12} className="pl-4">
							<p className="text-link-xs">Screen</p>
							<div className="line-screen"></div>
						</Col>
					</Card.Body>
					<Card.Body>
						<Seat />
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
					<Link to={path.payment}>
						<Button
							variant="primary shadow"
							className="float-right col-12 col-md-5"
						>
							Checkout now
						</Button>
					</Link>
				</div>
			</Col>
		);
	}
}
