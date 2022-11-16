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

const Home = () => {
	return (
		<div className="home">
			<div className="home-top">
				<HomeBanner />
			</div>
		</div>
	);
};

const mapStateToProps = (state) => ({
	auth: state.auth,
});
const mapDispatchToProps = { login };

export default connect(mapStateToProps, mapDispatchToProps)(Home);
