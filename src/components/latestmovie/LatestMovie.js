import React, { Component } from 'react';
import { Card, Image, Row, Col, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import listComingMovie from '../../shared/constants/listComingMovie';
import { getAllMovie } from '../../service/actions/movie';
import './styles.css';

class LatestComponent extends Component {
	async componentDidMount() {
		this.props.getAllMovie();
	}
	render() {
		const { movie } = this.props;
		return (
			<div>
				<Row>
					<Col>
						<p className="text-display-xs-bold float-left">Latest Movies</p>
					</Col>
					<Col>
						<Link to="#">
							<p className="text-primary float-right">Explore All</p>
						</Link>
					</Col>
				</Row>
				<div className="scrollmenu text-center">
					{movie.nowShowing.length > 0
						? movie.nowShowing.map((item, itemId) => {
								return (
									<Card key={itemId} className="scroll card mr-4">
										<Card.Body className="card-body">
											<Link
												to={`/movie-detail/${item.id}`}
												className="link"
												key={item.id}
												style={{ textDecoration: 'none' }}
											>
												<Image
													src={item.image}
													className="img-fluid img-resize"
												/>
											</Link>
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
						  })
						: listComingMovie.map((item, itemId) => {
								return (
									<Card key={itemId} className="scroll mr-4">
										<Card.Body>
											<Link
												to={`/movie-detail/${item.id}`}
												className="link"
												key={item.id}
												style={{ textDecoration: 'none' }}
											>
												<Image
													src={item.image}
													className="img-fluid img-resize"
												/>
											</Link>
											<p className="pt-3 pb-2 text-display-xs-bold-18 card-title m-0">
												{item.title}
											</p>
											<p className="text-xs-12 text-color-placeholder card-text pb-3 m-0">
												{item.genre}
											</p>
											<Link to="/">
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

export default connect(mapStateToProps, mapDispatchToProps)(LatestComponent);
