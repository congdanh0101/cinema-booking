import React, { Component } from 'react';
import { Redirect, Route } from 'react-router-dom';
import { connect } from 'react-redux';
import { autoLogin } from '../../service/actions/auth';
import { getUserDetail, getUserDetailById } from '../../service/actions/user';
import { path } from '../../shared/constants/path';

class AdminRoute extends Component {
	componentDidMount() {
		if (this.props.auth.token !== null)
			this.props.getUserDetail(this.props.auth.token).then(async () => {
				this.props.getUserDetailById(this.props.user.detail.id);
			});
	}
	render() {
		const Component = this.props.privateComponent;
		const Layout = this.props.privateLayout;
		return (
			<Route
				{...this.props}
				render={(props) => {
					if (this.props.auth.token !== null) {
						return this.props.user.detail.roles
							?.filter((role) => role.id === 501)
							.map((item) => {
								return (
									<Layout key={item.id} {...props}>
										<Component {...props} />
									</Layout>
								);
							});
					} else {
						return (
							<Redirect
								to={{ pathname: path.signUp, state: { from: props.location } }}
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
	user: state.user,
});

const mapDispatchToProps = { autoLogin, getUserDetail, getUserDetailById };

export default connect(mapStateToProps, mapDispatchToProps)(AdminRoute);