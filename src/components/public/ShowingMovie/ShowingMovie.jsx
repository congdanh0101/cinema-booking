import React, { Component } from 'react';
import { Card, Col, Row, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { getMovieByShowing } from '../../../service/actions/movie';
import listComingMovie from '../../../shared/constants/data/listComingMovie';
import { ImageResize } from '../../../components/common';
import { path } from '../../../shared/constants/path';
import './styles.css';

class ShowingComponent extends Component {
	async componentDidMount() {
		await this.props.getMovieByShowing();
	}
	render() {
		const { movie } = this.props;
		return (
			<div>
				<Row>
					<Col>
						<p className="text-display-xs-bold float-left">Now Showing</p>
					</Col>
					<Col>
						<Link to={path.movies}>
							<p className="text-primary float-right">Explore All</p>
						</Link>
					</Col>
				</Row>

				<div className="scrollmenu text-center">
					{movie.nowShowing.length > 0
						? movie.nowShowing.map((showing) => {
								return (
									<Card key={showing.id} className="scroll card mr-4">
										<Card.Body className="card-body">
											<Link
												to={`/movie-detail/${showing.id}`}
												className="link"
												style={{ textDecoration: 'none' }}
											>
												<ImageResize
													url={showing.image}
													width="200"
													className="img-fluid img-resize"
													alt="image"
												/>
											</Link>
											<p className="pt-2 pb-2 text-display-xs-bold-18 card-title m-0">
												{showing.name}
											</p>
											<Button
												href={`/movie-detail/${showing.id}`}
												variant="outline-primary"
												className="btn-nav"
												block
											>
												Book now
											</Button>
										</Card.Body>
									</Card>
								);
						  })
						: listComingMovie.map((showing) => {
								return (
									<Card key={showing.id} className="scroll card mr-4">
										<Card.Body className="card-body">
											<Link
												to={`/movie-detail/${showing.id}`}
												className="link"
												style={{ textDecoration: 'none' }}
											>
												<ImageResize
													url={showing.image}
													width="200"
													className="img-fluid img-resize"
													alt="image"
												/>
											</Link>
											<p className="pt-2 pb-2 text-display-xs-bold-18 card-title m-0">
												{showing.name}
											</p>
											<Button
												href={`/movie-detail/${showing.id}`}
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
	showTime: state.showTime,
});

const mapDispatchToProps = {
	getMovieByShowing,
};

export default connect(mapStateToProps, mapDispatchToProps)(ShowingComponent);
