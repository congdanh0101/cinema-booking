import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withStyles, Typography } from '@material-ui/core';
import styles from './styles';
import { AddGenre, GenreToolbar, GenreTable } from './components';
import {
	getAllGenre,
	toggleDialog,
	selectGenre,
	selectAllGenres,
} from '../../../service/actions/genre';
import { ResponsiveDialog } from '../../../components/common';

class GenrePanel extends Component {
	static propTypes = {
		className: PropTypes.string,
		classes: PropTypes.object.isRequired,
	};

	async componentDidMount() {
		const { genre, getAllGenre } = this.props;
		if (!genre.length) await getAllGenre();
	}

	render() {
		const { classes, genre, selectedGenres, openDialog, toggleDialog } =
			this.props;

		return (
			<div className={classes.root}>
				<GenreToolbar genre={genre} toggleDialog={toggleDialog} />
				<div className={classes.content}>
					{!genre.length ? (
						<Typography variant="h4">There are no genres</Typography>
					) : (
						<GenreTable genres={genre} />
					)}
				</div>
				<ResponsiveDialog
					id="Add-genre"
					open={openDialog}
					handleClose={() => toggleDialog()}
				>
					<AddGenre
						selectedShowtime={genre.find(
							(genre) => genre.id === selectedGenres[0]
						)}
					/>
				</ResponsiveDialog>
			</div>
		);
	}
}

const mapStateToProps = (state) => ({
	openDialog: state.showtime.openDialog,
	genre: state.genre.genres,
	selectedGenres: state.genre.selectedGenres,
});

const mapDispatchToProps = {
	toggleDialog,
	getAllGenre,
	selectGenre,
	selectAllGenres,
};

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(withStyles(styles)(GenrePanel));
