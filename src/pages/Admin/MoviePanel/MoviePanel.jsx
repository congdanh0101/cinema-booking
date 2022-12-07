import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withStyles } from '@material-ui/core';
import { CircularProgress, Grid, Box } from '@material-ui/core';
import { Pagination } from '@material-ui/lab';
import { match } from '../../../shared/utils/utils';
import {
	getMovieWithPagination,
	onSelectMovie,
} from '../../../service/actions/movie';

//Component
import { MovieToolbar, MovieCard, AddMovie } from './components';
import { ResponsiveDialog } from '../../../components/common';

//Styles
import { scrollTop } from '../../../shared/utils/utils';
import styles from './styles';

class MoviePanel extends Component {
	state = { search: '', pageNumber: 1 };
	componentDidMount() {
		const { movie, getMovieWithPagination } = this.props;
		if (!movie.length) getMovieWithPagination(this.state.pageNumber);
	}
	componentDidUpdate(prevProps, prevState) {
		const { movie, getMovieWithPagination } = this.props;
		if (prevState.pageNumber !== this.state.pageNumber) {
			if (!movie.length) getMovieWithPagination(this.state.pageNumber);
		}
		scrollTop();
	}
	handleChangePage = (event, pageNumber) => {
		this.setState({ pageNumber });
	};

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
		const { classes, selectedMovie, movie } = this.props;
		return (
			<div className={classes.root}>
				<MovieToolbar
					search={this.state.search}
					onChangeSearch={(e) => this.setState({ search: e.target.value })}
				/>
				<div className={classes.content}>
					{this.renderMovies()}
					<Box my={2} display="flex" justifyContent="center">
						<Pagination
							color="secondary"
							size="large"
							count={parseInt(movie.totalPages)}
							page={this.state.pageNumber}
							onChange={this.handleChangePage}
						/>
					</Box>
				</div>
				<ResponsiveDialog
					title="Edit Movie"
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
	getMovieWithPagination,
	onSelectMovie,
};

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(withStyles(styles)(MoviePanel));
