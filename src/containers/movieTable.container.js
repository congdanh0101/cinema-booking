import React, { Component } from 'react';
import { Table } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import http from '../shared/apis/axiosClient';

class MovieTable extends Component {
	state = {
		movies: [],
	};

	async componentDidMount() {
		const response = await http().get('movies');
		this.setState({
			movies: response.data.content,
		});
	}

	render() {
		const { movies } = this.state;
		return (
			<div>
				<Link to="/admin-panel/manage_movie/add">Add Movie</Link>
				<Table striped bordered hover>
					<thead>
						<tr>
							<th>ID</th>
							<th>Title</th>
							<th>Option</th>
						</tr>
					</thead>
					<tbody>
						{movies.map((movie) => {
							return (
								<tr key={String(movie.id)}>
									<td>{movie.id}</td>
									<td>{movie.name}</td>
									<td>
										<Link
											to={`/admin-panel/manage_movie/edit/${movie.id}`}
											className="btn btn-sm btn-warning"
										>
											Edit
										</Link>{' '}
										<Link
											to={`/admin-panel/manage_movie/delete/${movie.id}`}
											className="btn btn-sm btn-danger"
										>
											Delete
										</Link>
									</td>
								</tr>
							);
						})}
					</tbody>
				</Table>
			</div>
		);
	}
}

export default MovieTable;
