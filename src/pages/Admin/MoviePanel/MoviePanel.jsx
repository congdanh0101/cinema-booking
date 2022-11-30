import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withStyles } from '@material-ui/core';
import { CircularProgress, Grid } from '@material-ui/core';
import { match } from '../../../shared/utils/utils';
import { getMovies, onSelectMovie } from '../../../service/actions/movie';

//Component
import { MovieToolbar, MovieCard, AddMovie } from './components';
import { ResponsiveDialog } from '../../../components/common';

//Styles
import styles from './styles';

class MoviePanel extends Component {
	state = { search: '' };
	async componentDidMount() {
		const { movie, getMovies } = this.props;
		if (!movie.length) getMovies();
	}

	renderMovies() {
		const { classes } = this.props;
		const movies = match(this.state.search, this.props.movie.movies, 'name');
		if (!movies.length) {
			return (
				<div className={classes.progressWrapper}>
					<CircularProgress />
				</div>
			);
		}
		return (
			<Grid container spacing={3}>
				{movies.map((movie) => (
					<Grid
						item
						key={movie.id}
						lg={4}
						md={6}
						xs={12}
						onClick={() => this.props.onSelectMovie(movie)}
					>
						<MovieCard movie={movie} />
					</Grid>
				))}
			</Grid>
		);
	}

	render() {
		const { classes, selectedMovie } = this.props;
		return (
			<div className={classes.root}>
				<MovieToolbar
					search={this.state.search}
					onChangeSearch={(e) => this.setState({ search: e.target.value })}
				/>
				<div className={classes.content}>{this.renderMovies()}</div>
				<ResponsiveDialog
					id="Edit-movie"
					open={Boolean(selectedMovie)}
					handleClose={() => this.props.onSelectMovie(null)}
				>
					<AddMovie edit={selectedMovie} />
				</ResponsiveDialog>
			</div>
		);
	}
}

MoviePanel.propTypes = {
	classes: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
	movie: state.movie,
	selectedMovie: state.movie.selectedMovie,
});

const mapDispatchToProps = {
	getMovies,
	onSelectMovie,
};

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(withStyles(styles)(MoviePanel));
