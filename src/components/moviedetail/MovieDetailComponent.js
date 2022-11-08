import React, { Component } from 'react';
import { Card, Col, Form, Image, Row } from 'react-bootstrap';
import listShowTime from '../../shared/constants/listShowTime';
import map from '../../assets/images/map.svg';
import http from '../../shared/helpers/config';
import { getShowtimeDetail } from '../../service/actions/showtime';
import { getMovieDetail } from '../../service/actions/movie';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import './styles.css';

class MovieDetailComponent extends Component {
	constructor(props) {
		super(props);
		this.state = {
			selectValue: '',
			showResults: [],
			listShowTime,
		};
	}

	async componentDidMount() {
		const { id } = this.props.match.params;
		this.props.getMovieDetail(id);
		await this.props.getShowtimeDetail(id);
	}

	searchCinema = (e) => {
		this.setState({ [e.target.name]: e.target.value }, async () => {
			const data = new URLSearchParams();
			data.append(this.props.match.params.id);
			const response = await http().get(`showtimes/${data.toString()}`);
			console.log(response.data.data);
			this.setState({
				showResults: response.data,
			});
		});
	};

	render() {
		const { movie } = this.props;
		// const { details } = this.props.showtime;
		// const { showResults } = this.state;
		return (
			<div>
				<Row>
					<Col md={4} xs={12}>
						<Card className="text-center mx-auto card-img">
							<Card.Body>
								<Image src={movie.details.image} className="img-fluid" />
							</Card.Body>
						</Card>
					</Col>
					<Col xs={12} md={8}>
						<p className="text-display-sm-bold m-0">{movie.details.name}</p>
						{/* {movie.details.genres.map((subItem, subItemId) => {
							return (
								<p key={subItemId} class="text-md">
									{subItem.name}
								</p>
							);
						})} */}
						<Row xs={4} className="pt-2">
							<Col xs={6} lg={4}>
								<div className="flex-column justify-content-center d-flex">
									<p className="text-xs text-muted m-0">Release date</p>
									<p className="text-sm pt-1">{movie.details.releases}</p>
								</div>
							</Col>
							<Col xs={6} lg={4}>
								<div className="flex-column justify-content-center d-flex">
									<p className="text-xs text-muted m-0">Duration</p>
									<p className="text-sm pt-1">
										{movie.details.duration + ' mins'}
									</p>
								</div>
							</Col>
						</Row>
						<hr />
						<p className="text-link-lg-20">Description</p>
						<p className="text-sm">{movie.details.description}</p>
					</Col>
				</Row>

				<div className="text-center py-5">
					<p className="text-display-xs-bold">Showtimes and Tickets</p>
					<Row className="justify-content-center">
						<Col lg={3} md={5} xs={12} className="d-grid pt-0">
							<Form.Group className="d-flex align-items-center">
								<Image src={map} className="position-absolute pl-3" />
								<Form.Control
									name="location"
									defaultValue=""
									as="select"
									className="border-0 pl-5 pick"
									onChange={this.searchCinema}
								>
									<option value="">Select theater</option>
									{/* {details.theater.map((item) => (
										<option key={item.id} value={item.id}>
											{item.name}
										</option>
									))} */}
								</Form.Control>
								{/* {details.theater.map((item) => (
									<Form.Control
										key={item.id}
										name="location"
										defaultValue=""
										as="select"
										className="border-0 pl-5 pick"
										onChange={this.searchCinema}
									>
										<option value="">Select theater</option>
										<option value={item.id}>{item.name}</option>
									</Form.Control>
								))} */}
							</Form.Group>
						</Col>
					</Row>

					{/* {showResults.length > 0 ? (
						<Row xs={1} md={2} lg={3} className="g-3">
							{showResults.map((item) => (
								<Col className="pt-4 col">
									<Card className="card-movie border-0">
										<Card.Body className="pb-0">
											<Row>
												<Col
													xs={4}
													className="d-flex align-items-center justify-content-center"
												>
													<Image src={item.image} width={100} alt="" />
												</Col>
												<Col xs={8}>
													<p className="text-link-lg text-left m-0">
														{item.cinema}
													</p>
													<p className="text-300-12 text-left m-0">
														{item.address}
													</p>
												</Col>
											</Row>
										</Card.Body>
										<hr />
										<Card.Body className="pt-0">
											<Row xs={4}>
												{item.times.map((times) => {
													return (
														<Col className="time">
															<Button
																type="radio"
																size="sm"
																variant="light"
																className="btn-time"
																onClick={() =>
																	this.setState({ selectedTime: times.id })
																}
															>
																{times.time}
															</Button>
														</Col>
													);
												})}
											</Row>
										</Card.Body>
										<Card.Body className="pt-0 pb-2">
											<h6 className="float-left text-sm">Price</h6>
											<p className="float-right text-link-sm">
												${item.price}/seat
											</p>
										</Card.Body>
										<Card.Body className="pt-0 d-flex justify-content-between">
											<Link to="/order-page">
												<Button
													onClick={() =>
														this.props.createOrder(
															this.state.location,
															this.state.date,
															item,
															movie
														)
													}
													variant="primary"
													className="btn-nav shadow"
												>
													Book now
												</Button>
											</Link>
											<Button variant="light" className="btn-nav text-primary">
												Add to cart
											</Button>
										</Card.Body>
									</Card>
								</Col>
							))}
						</Row>
					) : (
						<p>There is no data</p>
					)} */}
				</div>
			</div>
		);
	}
}

const mapStateToProps = (state) => ({
	movie: state.movie,
	showtime: state.showtime,
});

const mapDispatchToProps = {
	getMovieDetail,
	getShowtimeDetail,
};

export default withRouter(
	connect(mapStateToProps, mapDispatchToProps)(MovieDetailComponent)
);
