import React, { Component } from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Container, Row, Form, Col, Card, Button } from 'react-bootstrap';
import { withStyles, Typography, Select } from '@material-ui/core';
import { MenuItem } from '@material-ui/core';
import * as moment from 'moment';
import { FileUpload } from '../../../../../components/common';
import { genreData } from '../../../../../shared/constants/data/listGenre.js';
import { ImageResize } from '../../../../../components/common';
import {
	addMovie,
	updateMovie,
	deleteMovie,
} from '../../../../../service/actions/movie';
import styles from './styles';

class AddMovie extends Component {
	state = {
		name: '',
		duration: 0,
		description: '',
		image: '',
		trailer: '',
		releases: moment(new Date(), 'DD-MM-YYYY'),
		genres: [],
	};

	componentDidMount() {
		if (this.props.edit) {
			const { name, duration, description, image, trailer, releases, genres } =
				this.props.edit;
			this.setState({
				name,
				duration,
				description,
				image,
				trailer,
				releases,
				genres: genres.map((genre) => genre.name),
			});
		}
	}

	componentDidUpdate(prevProps) {
		if (prevProps.movie !== this.props.movie) {
			const { name, duration, description, image, trailer, releases, genres } =
				this.props.movie;
			this.setState({
				name,
				duration,
				description,
				image,
				trailer,
				releases,
				genres,
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

	onAddMovie = async () => {
		const { name, duration, description, image, trailer, releases, genres } =
			this.state;
		await this.props.addMovie(
			name,
			duration,
			description,
			image,
			trailer,
			releases,
			genres
		);
	};

	onUpdateMovie = async () => {
		const { name, duration, description, image, trailer, releases, genres } =
			this.state;
		const movie = {
			name,
			duration,
			description,
			image,
			trailer,
			releases,
			genres: genres.join(','),
		};
		this.props.updateMovie(this.props.edit.id, movie);
	};

	onRemoveMovie = () => this.props.deleteMovie(this.props.edit.id);

	render() {
		const { classes, className } = this.props;
		const { name, duration, description, image, trailer, releases, genres } =
			this.state;

		const rootClassName = classNames(classes.root, className);
		const subtitle = this.props.edit ? 'Edit Movie' : 'Add Movie';
		const submitButton = this.props.edit ? 'Update Movie' : 'Save Details';
		const submitAction = this.props.edit
			? () => this.onUpdateMovie()
			: () => this.onAddMovie();

		return (
			<div className={rootClassName}>
				<Container fluid>
					<Typography variant="h4" className={classes.title}>
						{subtitle}
					</Typography>
					<Row>
						<Col xs={12} lg={8}>
							<Card className="border-0">
								<Card.Body>
									<Row>
										<Col md={4}>
											<Card className="scroll card">
												<Card.Body className="card-body">
													<ImageResize
														url="https://picfiles.alphacoders.com/148/148651.jpg"
														width="200"
														className="img-fluid img-resize"
														alt="image"
													/>
												</Card.Body>
											</Card>
										</Col>
										<Col md={8}>
											<Form.Group autoComplete="off" noValidate>
												<Form.Label>Movie Name</Form.Label>
												<Form.Control
													label="Title"
													type="text"
													placeholder="Please specify the title"
													value={name}
													onChange={(event) =>
														this.handleFieldChange('name', event.target.value)
													}
												/>
												<Form.Label className="pt-2">Genres</Form.Label>
												<Select
													multiple
													displayEmpty
													className={classes.textFieldSelect}
													label="Genre"
													margin="dense"
													required
													value={genres || []}
													variant="outlined"
													onChange={(event) =>
														this.handleFieldChange('genres', event.target.value)
													}
												>
													{genreData.map((genreItem, index) => (
														<MenuItem
															key={genreItem + '-' + index}
															value={genreItem}
														>
															{genreItem.name}
														</MenuItem>
													))}
												</Select>

												<Row>
													<Col>
														<Form.Label className="pt-2">
															Release date
														</Form.Label>
														<Form.Control
															type="date"
															label="Release date"
															value={moment(releases).format('DD-MM-YYYY')}
															onChange={(event) =>
																this.handleFieldChange(
																	'releases',
																	event.target.value
																)
															}
														/>
													</Col>
													<Col>
														<Form.Label className="pt-2">
															Duration (hour / minute)
														</Form.Label>
														<Form.Control
															type="number"
															label="Duration"
															placeholder="Please specify the duration"
															value={duration}
															onChange={(event) =>
																this.handleFieldChange(
																	'duration',
																	event.target.value
																)
															}
														/>
													</Col>
												</Row>
											</Form.Group>
										</Col>
									</Row>
									<Form.Group>
										<Form.Label>Description</Form.Label>
										<Form.Control
											type="text"
											as="textarea"
											value={description}
											onChange={(event) =>
												this.handleFieldChange(
													'description',
													event.target.value
												)
											}
										/>
									</Form.Group>
								</Card.Body>
							</Card>
						</Col>
						<Col md={4} xs={12}>
							<p className="text-display-xs-bold">File Upload</p>
							<Card>
								<Card.Body>
									<Form.Group className="d-flex align-items-center">
										<FileUpload
											className={classes.upload}
											file={image}
											onUpload={(event) => {
												const file = event.target.files[0];
												this.handleFieldChange('image', file);
											}}
										/>
									</Form.Group>
								</Card.Body>
							</Card>
							<p className="text-display-xs-bold pt-3">Trailer Upload</p>
							<Card>
								<Card.Body>
									<Form.Group className="d-flex align-items-center">
										<FileUpload
											className={classes.upload}
											file={trailer}
											onUpload={(event) => {
												const file = event.target.files[0];
												this.handleFieldChange('trailer', file);
											}}
										/>
									</Form.Group>
								</Card.Body>
							</Card>
						</Col>
						<Col>
							<Button
								className={classes.buttonFooter}
								variant="primary"
								block
								onClick={submitAction}
							>
								{submitButton}
							</Button>
							{this.props.edit && (
								<Button
									className={classes.buttonFooter}
									variant="secondary"
									block
									onClick={this.onRemoveMovie}
								>
									Delete Movie
								</Button>
							)}
						</Col>
					</Row>
				</Container>
			</div>
		);
	}
}

AddMovie.propTypes = {
	className: PropTypes.string,
	classes: PropTypes.object,
	movie: PropTypes.object,
};

const mapStateToProps = (state) => ({
	movie: state.movie,
});

const mapDispatchToProps = { addMovie, updateMovie, deleteMovie };

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(withStyles(styles)(AddMovie));
