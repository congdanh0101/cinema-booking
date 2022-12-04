import React, { Component } from 'react';
import { Card, Button, Pagination, PageItem  } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { getMovieWithPagination } from '../../../service/actions/movie';
import { ImageResize } from '../../../components/common';

import axiosClient from '../../../shared/apis/axiosClient';

import './styles.css';

class MovieList extends Component {
	state = {
		movieList: [],
		pageNumber: 0,
	};

	async componentDidMount() {
		await axiosClient()
			.get(`movies?pageNumber=${this.state.pageNumber}`)
			.then(async (res) => {
				this.setState({
					movieList: res.data.content,
				});
			});
	}

	handleChangePage = (event, page) => {
		this.setState({ page });
	};

	render() {
		const { movie } = this.props;
		console.log(this.state);

		return (
			<div>
				<h1 className="text-center">Movie List</h1>
				<div className="movie-list text-center">
					{movie.movies.length > 0 &&
						movie.movies.map((item, itemId) => {
							return (
								<Card key={itemId} className="mr-4">
									<Card.Body className="card-body">
										<ImageResize
											url={item.image}
											width="200"
											className="img-fluid img-resize"
										/>
										<p className="pt-2 pb-2 text-display-xs-bold-18 card-title m-0">
											{item.name}
										</p>
										<Link
											to={`/movie-detail/${item.id}`}
											className="link"
											key={item.id}
											style={{ textDecoration: 'none' }}
										>
											<Button
												variant="outline-primary"
												className="btn-nav"
												block
											>
												Detail
											</Button>
										</Link>
									</Card.Body>
								</Card>
							);
						})}
				</div>
				<div>
					<Pagination>
						<Pagination.First />
						<Pagination.Prev />

						<Pagination.Next />
						<Pagination.Last />
					</Pagination>
				</div>
			</div>
		);
	}
}

const mapStateToProps = (state) => ({
	movie: state.movie,
});

const mapDispatchToProps = {
	getMovieWithPagination,
};

export default connect(mapStateToProps, mapDispatchToProps)(MovieList);
