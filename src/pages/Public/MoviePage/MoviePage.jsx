import React, { Component } from 'react';
import { Container } from 'react-bootstrap';
import { MovieList } from '../../../components/public';

export default class MoviePage extends Component {
	render() {
		return (
			<div>
				<div className="bg-gray pb-5">
					<Container>
						<MovieList />
					</Container>
				</div>
			</div>
		);
	}
}
