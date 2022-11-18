import React, { Component } from 'react';
import { Redirect, Route } from 'react-router-dom';
import { connect } from 'react-redux';
import { autoLogin } from '../../service/actions/auth';
import { getUserDetail, getUserDetailById } from '../../service/actions/user';

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
						return this.props.user.detail.roles?.map((item) => {
							if (item.name !== 'ROLE_ADMIN') {
								return (
									<Redirect
										to={{
											pathname: '*',
											state: { from: props.location },
										}}
									/>
								);
							}
							return (
								<Layout key={item.id} {...props}>
									<Component {...props} />
								</Layout>
							);
						});
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
	user: state.user,
});

const mapDispatchToProps = { autoLogin, getUserDetail, getUserDetailById };

export default connect(mapStateToProps, mapDispatchToProps)(AdminRoute);
