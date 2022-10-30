// @ts-nocheck
import React, { Component } from 'react';
import MovieBanner from '../components/MovieBanner/MovieBanner';
import MoviesService from '../../../service/axios/Movies';

class MoviePage extends Component {
	constructor(props) {
		super(props);

		this.state = {
			id: this.props.match.params.id,
			movie: [],
		};
	}

	componentDidMount() {
		MoviesService.getMoviesById(this.state.id).then((res) => {
			this.setState({
				movie: res.data,
			});
		});
	}

	render() {
		console.log(this.state.movie);
		return (
			<>
				<MovieBanner movie={this.state.movie} fullDescription />
			</>
		);
	}
}

export default MoviePage;
