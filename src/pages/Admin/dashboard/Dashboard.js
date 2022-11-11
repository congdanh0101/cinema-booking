import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withStyles, Grid } from '@material-ui/core';
import {
	TotalUsers,
	TotalMovies,
	TotalReservations,
	UsersByDevice,
	TotalTickets,
	BestMovies,
} from './components';
import { getAllUser } from '../../../service/actions/user';
import { getAllMovie } from '../../../service/actions/movie';
import { getTickets } from '../../../service/actions/ticket';
import { getAllShowtime } from '../../../service/actions/showtime';

const styles = (theme) => ({
	root: {
		textAlign: 'center',
		padding: theme.spacing(4),
	},
});

class Dashboard extends Component {
	async componentDidMount() {
		this.props.getAllMovie();
		this.props.getAllUser();
		this.props.getAllShowtime();
		this.props.getTickets();
	}
	getBestMovies = (reservations, movies, total = 5) => {
		const reservationCounter = reservations.map((reservation) => ({
			movieId: reservation.movieId,
			count: reservations.filter((r) => r.movieId === reservation.movieId)
				.length,
		}));

		const result = [];
		const map = new Map();
		for (const item of reservationCounter) {
			if (!map.has(item.movieId)) {
				map.set(item.movieId, true); // set any value to Map
				result.push({
					movieId: item.movieId,
					count: item.count,
				});
			}
		}
		return result
			.sort((a, b) => b.count - a.count)
			.slice(0, total)
			.map((res) => ({
				movie: movies.find((movie) => movie._id === res.movieId),
				count: res.count,
			}));
	};
	render() {
		const { classes, users, movies, tickets, showtimes } = this.props;
		console.log(this.props);
		return (
			<div className={classes.root}>
				<Grid container spacing={4}>
					<Grid item lg={3} sm={6} xl={3} xs={12}>
						<TotalUsers users={users.users.length} />
					</Grid>
					<Grid item lg={3} sm={6} xl={3} xs={12}>
						<TotalMovies movies={movies.movies.length} />
					</Grid>
					<Grid item lg={3} sm={6} xl={3} xs={12}>
						<TotalTickets movies={tickets.tickets.length} />
					</Grid>
					<Grid item lg={3} sm={6} xl={3} xs={12}>
						<TotalReservations reservations={showtimes.showtimes.length} />
					</Grid>
					<Grid item lg={8} md={12} xl={9} xs={12}>
						<BestMovies
							bestMovies={this.getBestMovies(
								showtimes.showtimes,
								movies.movies,
								5
							)}
						/>
					</Grid>
					<Grid item lg={4} md={6} xl={3} xs={12}>
						<UsersByDevice />
					</Grid>
				</Grid>
			</div>
		);
	}
}

const mapStateToProps = (state) => ({
	users: state.user,
	movies: state.movie,
	tickets: state.ticket,
	showtimes: state.showtime,
});
const mapDispatchToProps = {
	getAllUser,
	getAllMovie,
	getAllShowtime,
	getTickets,
};
export default connect(
	mapStateToProps,
	mapDispatchToProps
)(withStyles(styles)(Dashboard));
