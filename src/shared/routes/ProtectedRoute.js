import React from 'react';
import { Redirect, Route } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { autoLogin } from '../../service/actions/auth';

const ProtectedRoute = (props) => {
	const { layout: Layout, component: Component, token, ...rest } = props;
	return (
		<Route
			{...rest}
			render={(props) =>
				token !== null ? (
					<Layout {...props}>
						<Component {...props} />
					</Layout>
				) : (
					<Redirect to={{ pathname: '*', state: { from: props.location } }} />
				)
			}
		/>
	);
};

ProtectedRoute.propTypes = {
	component: PropTypes.any.isRequired,
	layout: PropTypes.any.isRequired,
	path: PropTypes.string,
	token: PropTypes.string,
};

ProtectedRoute.defaultProps = {
	token: '',
};

const mapStateToProps = (state) => ({
	token: state.auth.token,
});

const mapDispatchToProps = { autoLogin };

export default connect(mapStateToProps, mapDispatchToProps)(ProtectedRoute);
