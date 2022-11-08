import React, { Component } from 'react';
import { Card, Image, Row, Col, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import listComingMovie from '../../shared/constants/listComingMovie';
import { getMovieByComing } from '../../service/actions/movie';
import './styles.css';

class ComingMovie extends Component {
	async componentDidMount() {
		this.props.getMovieByComing();
	}
	render() {
		const { movie } = this.props;
		return (
			<div>
				<Row>
					<Col>
						<p className="text-display-xs-bold float-left">Upcoming Movies</p>
					</Col>
					<Col>
						<Link to="#">
							<p className="text-primary float-right">Explore All</p>
						</Link>
					</Col>
				</Row>
				<div className="scrollmenu text-center">
					{movie.comingSoon.length > 0
						? movie.comingSoon.map((coming) => {
								return (
									<Card key={coming.id} className="scroll card mr-4">
										<Card.Body className="card-body">
											<Link
												to={`/movie-detail/${coming.id}`}
												className="link"
												style={{ textDecoration: 'none' }}
											>
												<Image
													src={coming.image}
													className="img-fluid img-resize"
												/>
											</Link>
											<p className="pt-2 pb-2 text-display-xs-bold-18 card-title m-0">
												{coming.name}
											</p>
											<Button
												href={`/movie-detail/${coming.id}`}
												variant="outline-primary"
												className="btn-nav"
												block
											>
												Detail
											</Button>
										</Card.Body>
									</Card>
								);
						  })
						: listComingMovie.map((coming) => {
								return (
									<Card key={coming.id} className="scroll card mr-4">
										<Card.Body className="card-body">
											<Link
												to={`/movie-detail/${coming.id}`}
												className="link"
												style={{ textDecoration: 'none' }}
											>
												<Image
													src={coming.image}
													className="img-fluid img-resize"
												/>
											</Link>
											<p className="pt-2 pb-2 text-display-xs-bold-18 card-title m-0">
												{coming.name}
											</p>
											<Button
												href={`/movie-detail/${coming.id}`}
												variant="outline-primary"
												className="btn-nav"
												block
											>
												Detail
											</Button>
										</Card.Body>
									</Card>
								);
						  })}
				</div>
			</div>
		);
	}
}

const mapStateToProps = (state) => ({
	movie: state.movie,
});

const mapDispatchToProps = {
	getMovieByComing,
};

export default connect(mapStateToProps, mapDispatchToProps)(ComingMovie);
