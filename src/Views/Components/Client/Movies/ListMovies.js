import React, { Component } from 'react';
import MoviesService from '../../../../Services/Movies';

class ListMovieComponent extends Component {
	constructor(props) {
		super(props);

		this.state = {
			movies: [],
		};
	}

	componentDidMount() {
		MoviesService.getAllMovies().then((res) => {
			this.setState({ movies: res.data.content });
		});
		console.log(this.state.movies);
	}

	render() {
		return (
			<div>
				<h2 className="text-center">Movies List</h2>
				<br></br>
				<div className="row">
					<table className="table table-striped table-bordered">
						<thead>
							<tr>
								<th> Name</th>
								<th> Duration</th>
								<th> Description</th>
							</tr>
						</thead>
						<tbody>
							{this.state.movies.map((movie) => (
								<tr key={movie.id}>
									<td> {movie.name} </td>
									<td> {movie.duration}</td>
									<td> {movie.description}</td>
								</tr>
							))}
						</tbody>
					</table>
				</div>
			</div>
		);
	}
}

export default ListMovieComponent;
