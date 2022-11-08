import React, { Component } from 'react';
import { Redirect, Route } from 'react-router-dom';
import { connect } from 'react-redux';
import { autoLogin } from '../../service/actions/auth';

class PrivateRoute extends Component {
	render() {
		const Component = this.props.privateComponent;
		const Layout = this.props.privateLayout;
		return (
			<Route
				{...this.props}
				render={(props) => {
					if (this.props.auth.token) {
						return (
							<Layout {...props}>
								<Component {...props} />
							</Layout>
						);
					} else {
						return (
							<Redirect
								to={{ pathname: '/sign-up', state: { from: props.location } }}
							/>
						);
					}
				}}
			></Route>
		);
	}
}

const mapStateToProps = (state) => ({
	auth: state.auth,
});

const mapDispatchToProps = { autoLogin };

export default connect(mapStateToProps, mapDispatchToProps)(PrivateRoute);
