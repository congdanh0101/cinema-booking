import React, { Component } from 'react';
import { withStyles, Grid, Typography } from '@material-ui/core';
import MoviesService from '../../../service/axios/Movies';
import ResponsiveMovieCard from '../components/ResponsiveMovieCard/ResponsiveMovieCard';
import styles from './styles';

class ComingPage extends Component {
	constructor(props) {
		super(props);

		this.state = {
			comingSoon: [],
		};
	}
	componentDidMount() {
		MoviesService.getAllMovies().then((res) => {
			const comingSoon = res.data.content.filter(
				(movie) => movie.showing === false && movie.coming === true
			);

			this.setState({
				comingSoon,
			});
		});
	}

	render() {
		const { classes } = this.props;

		return (
			<Grid container spacing={2}>
				<Grid item xs={12}>
					<Typography className={classes.title} variant="h2" color="inherit">
						Coming Soon
					</Typography>
				</Grid>
				<Grid
					container
					item
					xs={12}
					direction="column"
					alignItems="center"
					justify="center"
					spacing={2}
				>
					{this.state.comingSoon.map((movie) => (
						<Grid key={movie.id} item className={classes.fullWidth}>
							<ResponsiveMovieCard movie={movie} />
						</Grid>
					))}
				</Grid>
			</Grid>
		);
	}
}

export default withStyles(styles)(ComingPage);
