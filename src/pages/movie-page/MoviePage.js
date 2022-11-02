import React, { Component } from 'react';
import { Container, Row } from 'react-bootstrap';
import NavbarComponent from '../../components/navbar/NavbarComponent';
import FooterComponent from '../../components/footer/FooterComponent';
import MovieList from '../../components/movielist/MovieList';

export default class MoviePage extends Component {
	render() {
		return (
			<>
				<NavbarComponent />
				<div className="bg-gray">
					<Container>
						<Row>
							<MovieList />
						</Row>
					</Container>
				</div>
				<FooterComponent />
			</>
		);
	}
}
