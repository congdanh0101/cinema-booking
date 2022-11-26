import React, { Component, Fragment } from 'react';
import { Link } from 'react-router-dom';
import { Card, Col, Form, Image, Row, Button, Spinner } from 'react-bootstrap';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import moment from 'moment';
import {
	Datepicker,
	DatepickerEvent,
} from '@meinefinsternis/react-horizontal-date-picker';
import { enUS } from 'date-fns/locale';

import axiosClient from '../../../shared/apis/axiosClient';

import { path } from '../../../shared/constants/path';

import listShowTime from '../../../shared/constants/data/listShowTime';
import listDate from '../../../shared/constants/data/listDate';
import calendar from '../../../assets/images/calendar.svg';
import map from '../../../assets/images/map.svg';

import { getMovieDetail } from '../../../service/actions/movie';
import { createOrder } from '../../../service/actions/order';

import DetailMyTrailer from './components/Trailer/DetailMyTrailer';
import './styles.css';
import { set } from 'date-fns/esm';

class MovieDetailComponent extends Component {
	constructor(props) {
		super(props);
		this.state = {
			selectedDate: null,
			today: new Date(),
			lastTwoDays: new Date(new Date().valueOf() - 1000 * 60 * 60 * 24 * 2),
			showResults: [],
			listShowTime,
		};
	}

	async componentDidMount() {
		const { id } = this.props.match.params;
		const token = localStorage.getItem('token');

		await this.props.getMovieDetail(id);

		var event = this.state.today;
		let showDate = event.toLocaleDateString().slice(0, 10);
		showDate = moment(showDate).format('DD-MM-YYYY');

		await axiosClient(token)
			.post(`showtimes/movies/${id}`, {
				showDate,
			})
			.then((res) => {
				this.setState({
					showResults: res.data,
				});
			});
	}

	handleChange = async (val) => {
		const [startValue, endValue, rangeDates] = val;

		if (this.state.today === startValue && this.state.today <= endValue) {
			this.setState({
				today: rangeDates[rangeDates.length - 1],
			});
		} else if (this.state.today === endValue) {
			this.setState({
				today: rangeDates[0],
			});
		}
	};

	searchShowtime = async (val) => {
		this.handleChange(val);

		const { id } = this.props.match.params;
		const token = localStorage.getItem('token');

		this.state.selectedDate = this.state.today;

		var event = this.state.selectedDate;
		let showDate = event.toLocaleDateString().slice(0, 10);
		showDate = moment(showDate).format('DD-MM-YYYY');

		await axiosClient(token)
			.post(`showtimes/movies/${id}`, {
				showDate,
			})
			.then((res) => {
				this.setState({
					showResults: res.data,
				});
			});

		console.log(this.state);
	};

	render() {
		const { details } = this.props;
		const { showResults, lastTwoDays, today } = this.state;

		console.log(this.state);

		return (
			<div className="container">
				<Row>
					<Col md={4} xs={12}>
						<Card className="text-center mx-auto card-img">
							<Card.Body>
								<Image src={details.image} className="img-fluid" />
							</Card.Body>
						</Card>
					</Col>
					<Col xs={12} md={8}>
						<p className="text-display-sm-bold m-0">{details.name}</p>
						{details.genres &&
							details.genres.map((item) => (
								<Fragment key={item.id}>
									<span>{item.name} </span>
								</Fragment>
							))}
						<Row xs={4} className="pt-4">
							<Col xs={6} lg={4}>
								<div className="flex-column justify-content-center d-flex">
									<p className="text-xs text-muted m-0">Release date</p>
									<p className="text-sm pt-1">{details.releases}</p>
								</div>
							</Col>
							<Col xs={6} lg={4}>
								<div className="flex-column justify-content-center d-flex">
									<p className="text-xs text-muted m-0">Duration</p>
									<p className="text-sm pt-1">{details.duration + ' mins'}</p>
								</div>
							</Col>
						</Row>
						<hr />
						<p className="text-link-lg-20">Overview</p>
						<p className="text-sm">{details.description}</p>
					</Col>
					{/* <Col xs={4} md={12}>
						{details.trailer && isNaN(details.trailer) ? (
							<DetailMyTrailer url={details?.trailer} />
						) : null}
					</Col> */}
				</Row>
				<div className="text-center py-4">
					<p className="text-display-xs-bold">Showtimes and Tickets</p>
					<Row className="justify-content-center">
						<Datepicker
							startValue={today}
							startDate={lastTwoDays}
							onChange={(e) => this.searchShowtime(e)}
							// onChange={(e) => this.handleChange(e)}
							locale={enUS}
						/>
					</Row>

					{showResults.length > 0 ? (
						<Row xs={1} md={2} lg={3} className="g-3">
							{showResults.map((item) => (
								<Col key={item.id} className="pt-4 col">
									<Card className="card-movie border-0">
										<Card.Body className="pb-0">
											<Row>
												<Col xs={10}>
													<p className="text-link-lg text-left m-0">
														{item.showDate}
													</p>
												</Col>
												<Col
													xs={5}
													className="d-flex align-items-center justify-content-center"
												>
													<p className="text-300-12 text-left m-0">
														{item.timeStart} : {item.timeEnd}
													</p>
												</Col>
											</Row>
										</Card.Body>
										<hr />
										<Card.Body className="pt-0 pb-0">
											<h6 className="float-left text-sm">Price</h6>
											<p className="float-right text-link-sm">
												${item.price}/ticket
											</p>
										</Card.Body>
										<Card.Body className="pt-0 d-flex justify-content-end">
											<Link to={`/order/${item.id}`}>
												<Button variant="primary" className="btn-nav shadow">
													Book now
												</Button>
											</Link>
										</Card.Body>
									</Card>
								</Col>
							))}
						</Row>
					) : (
						<p className="text-md pt-2">There are no showtimes available</p>
					)}
				</div>
			</div>
		);
	}
}

const mapStateToProps = (state) => ({
	details: state.movie.details,
	showtimes: state.showtime.showtimes,
});

const mapDispatchToProps = {
	getMovieDetail,
	createOrder,
};

export default withRouter(
	connect(mapStateToProps, mapDispatchToProps)(MovieDetailComponent)
);
