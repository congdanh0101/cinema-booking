import React, { Component } from 'react';
import { Container, Row } from 'react-bootstrap';
import NavbarComponent from '../../components/navbar/NavbarComponent';

import FooterComponent from '../../components/footer/FooterComponent';

export default class MoviePage extends Component {
	render() {
		return (
			<>
				<NavbarComponent />
				<div className="bg-gray">
					<Container>
						<Row>
                            
                        </Row>
					</Container>
				</div>
				<FooterComponent />
			</>
		);
	}
}
