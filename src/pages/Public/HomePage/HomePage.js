import React, { Fragment, Component } from 'react';
import MoviesService from '../../../service/axios/Movies';
import styles from './styles';
import { withStyles, Box, Grid } from '@material-ui/core';
import MovieCarousel from '../components/MovieCarousel/MovieCarousel';
import MovieBanner from '../components/MovieBanner/MovieBanner';

class HomePage extends Component {
	constructor(props) {
		super(props);

		this.state = {
			movies: [],
			latestMovies: [],
			nowShowing: [],
			comingSoon: [],
			randomMovie: null,
		};
	}

	componentDidMount() {
		MoviesService.getAllMovies().then((res) => {
			const latestMovies = res.data.content
				.sort((a, b) => Date.parse(b.releases) - Date.parse(a.releases))
				.slice(0, 5);

			const nowShowing = res.data.content.filter(
				(movie) => movie.showing === true && movie.coming === false
			);

			const comingSoon = res.data.content.filter(
				(movie) => movie.coming === true && movie.showing === false
			);

			const randomMovie =
				res.data.content[Math.floor(Math.random() * res.data.content.length)];

			this.setState({
				movies: res.data.content,
				randomMovie,
				latestMovies,
				nowShowing,
				comingSoon,
			});
		});
	}

	render() {
		const { classes } = this.props;
		return (
			<Fragment>
				<MovieBanner movie={this.state.randomMovie} height="85vh" />

				<Box height={60} />

				<MovieCarousel
					carouselClass={classes.carousel}
					title="Now Showing"
					to="/movie/category/nowShowing"
					movies={this.state.nowShowing}
				/>

				<MovieCarousel
					carouselClass={classes.carousel}
					title="Coming Soon"
					to="/movie/category/comingSoon"
					movies={this.state.comingSoon}
				/>

				{false && (
					<Grid container style={{ height: 500 }}>
						<Grid item xs={7} style={{ background: '#131334' }}></Grid>
						<Grid item xs={5} style={{ background: '#010025' }}></Grid>
					</Grid>
				)}
			</Fragment>
		);
	}
}

export default withStyles(styles)(HomePage);
