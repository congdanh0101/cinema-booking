import React, { Component } from 'react';
import { Col, Container, Row, Image, Card } from 'react-bootstrap';
import {
	ShowingComponent,
	SubscribeComponent,
	ComingComponent,
} from '../../../components/public';
import './styles.css';
import { login } from '../../../service/actions/auth';
import { connect } from 'react-redux';
import HomeBanner from '../../../modules/Public/Home/HomeBanner';

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
												src="https://wallpapercave.com/wp/wp1816326.jpg"
												className="img-fluid"
											/>
										</div>
									</Col>
									<Col style={{ paddingTop: 40 }}>
										<div className="img-gradient">
											<Image
												src="https://static01.nyt.com/images/2020/02/05/multimedia/05xp-lionking/merlin_165677088_8820db00-d13c-4f15-a5a4-be78b888c5b6-jumbo.jpg?quality=90&auto=webp"
												className="img-fluid"
											/>
										</div>
									</Col>
									<Col>
										<div className="img-gradient">
											<Image
												src="https://wallpapercave.com/wp/wp3703396.jpg"
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
					<section>
						<SubscribeComponent />
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
