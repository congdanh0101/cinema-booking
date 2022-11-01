import React, { Component } from 'react';
import { Card, Col, Image, Row, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { getAllMovie } from '../../redux/actions/movie';
import { getAllShowtime } from '../../redux/actions/showtime';
import './styles.css';

class ShowingComponent extends Component {
	async componentDidMount() {
		this.props.getAllMovie();
		this.props.getAllShowtime();
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
						<Link to="#">
							<p className="text-primary float-right">Explore All</p>
						</Link>
					</Col>
				</Row>

				<div className="scrollmenu text-center">
					{movie.nowShowing.map((item, itemId) => {
						return (
							<Card key={itemId} className="scroll card mr-4">
								<Card.Body className="card-body">
									<Image src={item.image} className="img-fluid img-resize" />
									<p className="pt-2 pb-2 text-display-xs-bold-18 card-title m-0">
										{item.title}
									</p>
									<p className="text-xs-13 text-color-placeholder card-text pb-2 m-0">
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
			</div>
		);
	}
}

const mapStateToProps = (state) => ({
	movie: state.movie,
	showTime: state.showTime,
});

const mapDispatchToProps = {
	getAllMovie,
	getAllShowtime,
};

export default connect(mapStateToProps, mapDispatchToProps)(ShowingComponent);
