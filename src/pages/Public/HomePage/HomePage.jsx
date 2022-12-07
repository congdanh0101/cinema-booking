import React, { Component } from 'react';
import { Col, Container, Row, Image } from 'react-bootstrap';
import { ShowingComponent, ComingComponent } from '../../../components/public';
import './styles.css';
import { login } from '../../../service/actions/auth';
import { connect } from 'react-redux';

class HomePage extends Component {
	render() {
		return (
			<div>
				<Container>
					<section>
						<Row>
							<Col
								md={6}
								sm={12}
								className="flex-column justify-content-center d-flex"
							>
								<p className="text-color-placeholder text-display-xs m-0">
									Nearest Cinema, Newest Movie,
								</p>
								<p className="text-display-lg-bold-56 text-primary m-0">
									Find out now!
								</p>
							</Col>
							<Col md={6} sm={12}>
								<Row md={3} lg={4}>
									<Col style={{ paddingTop: 80 }}>
										<div className="img-gradient">
											<Image
												src="https://source.unsplash.com/featured/?movies"
												className="img-fluid"
											/>
										</div>
									</Col>
									<Col style={{ paddingTop: 40 }}>
										<div className="img-gradient">
											<Image
												src="https://source.unsplash.com/featured/?cinema"
												className="img-fluid"
											/>
										</div>
									</Col>
									<Col>
										<div className="img-gradient">
											<Image
												src="https://source.unsplash.com/featured/?theater"
												className="img-fluid"
											/>
										</div>
									</Col>
								</Row>
							</Col>
						</Row>
					</section>
					<section>
						<ShowingComponent />
					</section>
					<section>
						<ComingComponent />
					</section>
				</Container>
			</div>
		);
	}
}

const mapStateToProps = (state) => ({
	auth: state.auth,
});
const mapDispatchToProps = { login };

export default connect(mapStateToProps, mapDispatchToProps)(HomePage);
