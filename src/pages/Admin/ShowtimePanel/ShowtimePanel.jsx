import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withStyles, Typography } from '@material-ui/core';
import styles from './styles';
import { AddShowtime, ShowtimesToolbar, ShowtimesTable } from './components';
import {
	getAllShowtime,
	toggleDialog,
	selectShowtime,
	selectAllShowtimes,
	deleteShowtime,
} from '../../../service/actions/showtime';
import { getAllTheater } from '../../../service/actions/theater';
import { getAllMovie } from '../../../service/actions/movie';
import { ResponsiveDialog } from '../../../components/common';

class ShowtimeList extends Component {
	static propTypes = {
		className: PropTypes.string,
		classes: PropTypes.object.isRequired,
	};

	async componentDidMount() {
		const {
			showtime,
			movie,
			theater,
			getAllShowtime,
			getAllMovie,
			getAllTheater,
		} = this.props;
		if (!movie.length) await getAllMovie();
		if (!showtime.length) await getAllShowtime();
		if (!theater.length) await getAllTheater();
	}

	handleDeleteShowtime = () => {
		const { selectedShowtimes, deleteShowtime } = this.props;
		selectedShowtimes.forEach((element) => deleteShowtime(element));
	};

	render() {
		const {
			classes,
			showtime,
			selectedShowtimes,
			openDialog,
			toggleDialog,
			selectShowtime,
			selectAllShowtimes,
		} = this.props;
		console.log(this.props);
		return (
			<div className={classes.root}>
				<ShowtimesToolbar
					showtimes={showtime}
					toggleDialog={toggleDialog}
					selectedShowtimes={selectedShowtimes}
					deleteShowtime={this.handleDeleteShowtime}
				/>
				<div className={classes.content}>
					{!showtime.length ? (
						<Typography variant="h4">There are no showtimes</Typography>
					) : (
						<ShowtimesTable
							onSelectShowtime={selectShowtime}
							selectedShowtimes={selectedShowtimes}
							selectAllShowtimes={selectAllShowtimes}
							showtimes={showtime}
						/>
					)}
				</div>
				<ResponsiveDialog
					id="Add-showtime"
					open={openDialog}
					handleClose={() => toggleDialog()}
				>
					<AddShowtime
						selectedShowtime={showtime.find(
							(showtime) => showtime.id === selectedShowtimes[0]
						)}
					/>
				</ResponsiveDialog>
			</div>
		);
	}
}

const mapStateToProps = (state) => ({
	openDialog: state.showtime.openDialog,
	movie: state.movie.movies,
	showtime: state.showtime.showtimes,
	theater: state.theater.theaters,
	selectedShowtimes: state.showtime.selectedShowtimes,
});

const mapDispatchToProps = {
	getAllMovie,
	getAllShowtime,
	getAllTheater,
	toggleDialog,
	selectShowtime,
	selectAllShowtimes,
	deleteShowtime,
};

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(withStyles(styles)(ShowtimeList));
