import React, { Component } from 'react';
import { Container } from 'react-bootstrap';
import { MovieList } from '../../../components/public';

import SearchMovie from '../../../components/public/MovieList/SearchMovie';
import MovieList2 from '../../../components/public/MovieList/MovieList2';

export default class MoviePage extends Component {
	render() {
		return (
			<div>
				<div className="bg-gray pb-5">
					<Container>
						<MovieList2 />
					</Container>
				</div>
			</div>
		);
	}
}
