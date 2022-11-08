import React, { Component } from 'react';
import { Container, Row } from 'react-bootstrap';
import MovieList from '../../../components/movielist/MovieList';

export default class MoviePage extends Component {
	render() {
		return (
			<div>
				<div className="bg-gray">
					<Container>
						<Row>
							<MovieList />
						</Row>
					</Container>
				</div>
			</div>
		);
	}
}
