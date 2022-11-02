import React, { Component } from 'react';
import { Card, Col, Image } from 'react-bootstrap';
import { connect } from 'react-redux';
import './styles.css';
import { getUserDetail } from '../../redux/actions/user';

class InfoProfile extends Component {
	async componentDidMount() {
		await this.props.getUserDetail(this.props.auth.token, this.props.auth.token);
		// this.props.getAllUser();
	}
	render() {
		const { data } = this.props.user;
		return (
			<Col xs={12} md={4}>
				<Card>
					<Card.Body>
						<div className="d-flex justify-content-center">
							<p className="text-color-body text-link-lg-20">INFO</p>
						</div>
						<div className="text-center">
							<Image
								src={
									'https://icon-library.com/images/default-user-icon/default-user-icon-4.jpg'
								}
								className="img-profile shadow"
							/>
							{/* <p className="text-link-lg-20 pt-3 mb-0">
								{data.firstName + ' ' + data.lastName}
							</p>
							<p className="text-link-lg-20 pt-3 mb-0">{data.email}</p>
							<p className="text-link-lg-20 pt-3 mb-0">{data.phoneNumber}</p>
							<p className="text-link-lg-20 pt-3 mb-0">{data.gender}</p>
							<p className="text-color-body">Moviegoers</p>
							<p className="text-color-body">{data.role}</p> */}
						</div>
					</Card.Body>
				</Card>
			</Col>
		);
	}
}

const mapStateToProps = (state) => ({
	auth: state.auth,
	user: state.user,
});

const mapDispatchToProps = { getUserDetail };

export default connect(mapStateToProps, mapDispatchToProps)(InfoProfile);
