import React, { Component } from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withStyles, Typography, MenuItem, Select } from '@material-ui/core';
import { Container, Row, Form, Col, Card, Button } from 'react-bootstrap';
import { listTime } from '../../../../../shared/constants/data/listTime';
import styles from './styles';
import moment from 'moment';
import { ImageResize } from '../../../../../components/common';
import {
	addShowtime,
	updateShowtime,
	deleteShowtime,
	deleteShowtimeForce,
} from '../../../../../service/actions/showtime';
import { toast } from 'react-toastify';

class AddShowtime extends Component {
	state = {
		movieId: '',
		cinemaId: '',
		timeStart: '',
		showDate: moment(new Date().toISOString().slice(0, 10)).format(
			'YYYY-MM-DD'
		),
	};

	formatDate = (dateStr) => {
		const [year, month, day] = dateStr.split('-');
		let newDate = `${day}-${month}-${year}`;
		return newDate;
	};

	componentWillUnmount() {
		this.setState = (state, callback) => {
			return;
		};
	}

	componentDidMount() {
		if (this.props.selectedShowtime) {
			const { movie, theater, timeStart, showDate } =
				this.props.selectedShowtime;
			this.setState({
				movieId: movie.id,
				cinemaId: theater.id,
				timeStart: timeStart,
				showDate: this.formatDate(showDate),
			});
		}
	}

	handleChange = (e) => {
		this.setState({
			state: e.target.value,
		});
	};

	handleFieldChange = (field, value) => {
		const newState = { ...this.state };
		newState[field] = value;
		this.setState(newState);
	};

	onAddShowtime = async () => {
		const { showDate, timeStart, movieId, cinemaId } = this.state;
		await this.props.addShowtime(
			movieId,
			cinemaId,
			moment(showDate).format('DD-MM-YYYY'),
			timeStart
		);
		this.props.showtimes.message !== ''
			? toast.success('Successfully Added').then(() => window.location.reload())
			: toast.error(this.props.showtimes.errorMsg);
	};

	onUpdateShowtime = async () => {
		const { showDate, timeStart, movieId, cinemaId } = this.state;
		await this.props.updateShowtime(
			this.props.selectedShowtime.id,
			movieId,
			cinemaId,
			moment(showDate).format('DD-MM-YYYY'),
			timeStart
		);

		if (this.props.showtimes.message !== '') {
			toast.success('Successfully Updated');
			window.location.reload();
		} else {
			toast.error(this.props.showtimes.errorMsg);
		}
	};

	render() {
		const { movie, theater, classes, className } = this.props;
		console.log(this.props);
		const { timeStart, showDate, movieId, cinemaId } = this.state;

		const rootClassName = classNames(classes.root, className);
		const title = this.props.selectedShowtime
			? 'Edit Showtime'
			: 'Add Showtime';
		const submitButton = this.props.selectedShowtime
			? 'Update Showtime'
			: 'Save Details';
		const submitAction = this.props.selectedShowtime
			? () => this.onUpdateShowtime()
			: () => this.onAddShowtime();

		console.log(this.props);

		return (
			<div className={rootClassName}>
				<Container fluid>
					<Typography variant="h4" className={classes.title}>
						{title}
					</Typography>
					<hr />
					<Row>
						<Col>
							<Card className="border-0">
								<Card.Body>
									<Row>
										<Col>
											<Form.Group autoComplete="off" noValidate>
												<Row>
													<Col>
														<Form.Label>Movie</Form.Label>
														<Select
															className={classes.textFieldSelect}
															fullWidth
															required
															value={movieId || ''}
															variant="outlined"
															onChange={(event) =>
																this.handleFieldChange(
																	'movieId',
																	event.target.value
																)
															}
														>
															{movie?.map((movie) => (
																<MenuItem key={movie.id} value={movie.id}>
																	<div className={classes.selectMovie}>
																		<ImageResize
																			width="40"
																			className={classes.selectPoster}
																			url={movie.image}
																			alt="poster"
																		/>
																		<span>{movie.name}</span>
																	</div>
																</MenuItem>
															))}
														</Select>
													</Col>
													<Col>
														<Form.Label>Theater</Form.Label>
														<Select
															className={classes.textFieldSelect}
															fullWidth
															required
															value={cinemaId || ''}
															variant="outlined"
															onChange={(event) =>
																this.handleFieldChange(
																	'cinemaId',
																	event.target.value
																)
															}
														>
															{theater?.map((theater) => (
																<MenuItem key={theater.id} value={theater.id}>
																	<div className={classes.selectMovie}>
																		<ImageResize
																			width="40"
																			className={classes.selectPoster}
																			url={
																				'https://source.unsplash.com/featured/?cinema'
																			}
																			alt="poster"
																		/>
																		<span>{theater.name}</span>
																	</div>
																</MenuItem>
															))}
														</Select>
													</Col>
												</Row>
												<Row>
													<Col className="pt-3">
														<Form.Label>Date Show</Form.Label>
														<Form.Control
															type="date"
															value={showDate}
															onChange={(event) =>
																this.handleFieldChange(
																	'showDate',
																	event.target.value
																)
															}
														/>
													</Col>
													<Col className="pt-3">
														<Form.Label>Time Start</Form.Label>
														<Select
															className={classes.textFieldSelect}
															fullWidth
															placeholder="Please specify the Time"
															required
															value={timeStart || ''}
															variant="outlined"
															onChange={(event) =>
																this.handleFieldChange(
																	'timeStart',
																	event.target.value
																)
															}
														>
															{listTime?.map((time) => {
																return time <= '12:00' ? (
																	<MenuItem key={`time-${time}`} value={time}>
																		{time} AM
																	</MenuItem>
																) : (
																	<MenuItem key={`time-${time}`} value={time}>
																		{time} PM
																	</MenuItem>
																);
															})}
														</Select>
													</Col>
												</Row>
											</Form.Group>
										</Col>
									</Row>
								</Card.Body>
							</Card>
						</Col>
						<Button
							className={classes.buttonFooter}
							color="primary"
							block
							onClick={submitAction}
						>
							{submitButton}
						</Button>
					</Row>
				</Container>
			</div>
		);
	}
}

AddShowtime.propTypes = {
	className: PropTypes.string,
	classes: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
	theater: state.theater.theaters,
	movie: state.movie.displaying,
	showtimes: state.showtime,
});

const mapDispatchToProps = {
	addShowtime,
	updateShowtime,
	deleteShowtime,
	deleteShowtimeForce,
};

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(withStyles(styles)(AddShowtime));
