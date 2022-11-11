import React, { Component } from 'react';
import { Card, Image, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { getAllMovie } from '../../../service/actions/movie';
import './styles.css';

class MovieList extends Component {
	async componentDidMount() {
		this.props.getAllMovie();
	}
	render() {
		const { movie } = this.props;
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
