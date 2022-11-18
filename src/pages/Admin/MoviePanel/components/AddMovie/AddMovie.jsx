import React, { Component } from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Container, Row, Form, Col } from 'react-bootstrap';
import { withStyles, Typography, Select } from '@material-ui/core';
import { Button, TextField, MenuItem } from '@material-ui/core';
import styles from './styles';
import { FileUpload } from '../../../../../components/common';
import { genreData } from '../../../../../shared/constants/data/listGenre.js';
import {
	addMovie,
	updateMovie,
	deleteMovie,
} from '../../../../../service/actions/movie';

class AddMovie extends Component {
	state = {
		name: '',
		duration: 0,
		description: '',
		image: '',
		trailer: '',
		releases: new Date().toLocaleDateString(),
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
				<Typography variant="h4" className={classes.title}>
					{subtitle}
				</Typography>
				<div>
					<Form.Group autoComplete="off" noValidate>
						<div className={classes.field}>
							<TextField
								className={classes.textField}
								helpertext="Please specify the title"
								label="Title"
								margin="dense"
								required
								value={name}
								variant="outlined"
								onChange={(event) =>
									this.handleFieldChange('name', event.target.value)
								}
							/>
						</div>
						<div className={classes.field}>
							<Select
								multiple
								displayEmpty
								className={classes.textField}
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
									<MenuItem key={genreItem + '-' + index} value={genreItem}>
										{genreItem.name}
									</MenuItem>
								))}
							</Select>
						</div>
						<div className={classes.field}>
							<TextField
								className={classes.textField}
								label="Duration"
								margin="dense"
								type="number"
								value={duration}
								variant="outlined"
								onChange={(event) =>
									this.handleFieldChange('duration', event.target.value)
								}
							/>
						</div>
						<div className={classes.field}>
							<TextField
								className={classes.textField}
								helpertext="Please specify the release date"
								label="Releases"
								margin="dense"
								required
								value={releases}
								variant="outlined"
								onChange={(event) =>
									this.handleFieldChange('releases', event.target.value)
								}
							/>
						</div>
						<div className={classes.field}>
							<TextField
								fullWidth
								multiline
								className={classes.textField}
								label="Description"
								margin="dense"
								required
								variant="outlined"
								value={description}
								onChange={(event) =>
									this.handleFieldChange('description', event.target.value)
								}
							/>
						</div>
						<Container>
							<Col className="container-fluid">
								<Row className="container-fluid">
									<Col>
										<Typography variant="h5" className={classes.title}>
											Image
										</Typography>
									</Col>
									<Col>
										<Typography variant="h5" className={classes.title}>
											Trailer
										</Typography>
									</Col>
								</Row>
								<Row>
									<Col>
										<div className={classes.field}>
											<FileUpload
												className={classes.upload}
												file={image}
												onUpload={(event) => {
													const file = event.target.files[0];
													this.handleFieldChange('image', file);
												}}
											/>
										</div>
									</Col>
									<Col>
										<div className={classes.field}>
											<FileUpload
												className={classes.upload}
												file={trailer}
												onUpload={(event) => {
													const file = event.target.files[0];
													this.handleFieldChange('trailer', file);
												}}
											/>
										</div>
									</Col>
								</Row>
							</Col>
						</Container>
					</Form.Group>
				</div>
				<Button
					className={classes.buttonFooter}
					color="primary"
					variant="contained"
					onClick={submitAction}
				>
					{submitButton}
				</Button>
				{this.props.edit && (
					<Button
						color="secondary"
						className={classes.buttonFooter}
						variant="contained"
						onClick={this.onRemoveMovie}
					>
						Delete Movie
					</Button>
				)}
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
