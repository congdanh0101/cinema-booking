import React, { Component } from 'react';
import { Card, Image, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { getAllMovie } from '../../redux/actions/movie';
import './styles.css';

class MovieList extends Component {
	async componentDidMount() {
		this.props.getAllMovie();
	}
	render() {
		const { movie } = this.props;
		console.log(movie);
		return (
			<div className="scrollmenu text-center">
				{movie.movies.map((item, itemId) => {
					return (
						<Card key={itemId} className="scroll card mr-4">
							<Card.Body className="card-body">
								<Image src={item.image} className="img-fluid img-resize" />
								<p className="pt-2 pb-2 text-display-xs-bold-18 card-title m-0">
									{item.name}
								</p>
								{item.genres.map((subItem, subItemId) => {
									return (
										<div>
											<p
												key={subItemId}
												class="text-xs-13 text-color-placeholder card-text pb-2 m-0"
											>
												{subItem.name}
											</p>
										</div>
									);
								})}
								<Link
									to={`/movie-detail/${item.id}`}
									className="link"
									key={item.id}
									style={{ textDecoration: 'none' }}
								>
									<Button variant="outline-primary" className="btn-nav" block>
										Detail
									</Button>
								</Link>
							</Card.Body>
						</Card>
					);
				})}
			</div>
		);
	}
}

const mapStateToProps = (state) => ({
	movie: state.movie,
});

const mapDispatchToProps = {
	getAllMovie,
};

export default connect(mapStateToProps, mapDispatchToProps)(MovieList);
