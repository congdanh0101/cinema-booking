import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Navbar, Container, Image } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import tickitz_purple from '../../../../assets/images/tickitz-purple.svg';
import { connect } from 'react-redux';
import { logout } from '../../../../service/actions/auth';
import {
	getUserDetail,
	getUserDetailById,
} from '../../../../service/actions/user';

import { withStyles } from '@material-ui/core/styles';
import { Badge, Toolbar, IconButton } from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';
import CloseIcon from '@material-ui/icons/Close';
import InputIcon from '@material-ui/icons/Input';
import NotificationsIcon from '@material-ui/icons/NotificationsOutlined';

// Component styles
import styles from './styles';
import { Fragment } from 'react';

class NavbarComponent extends Component {
	static defaultProps = {
		title: 'Dashboard',
		isSidebarOpen: false,
	};
	static propTypes = {
		children: PropTypes.node,
		classes: PropTypes.object.isRequired,
		isSidebarOpen: PropTypes.bool,
		title: PropTypes.string,
		logout: PropTypes.func.isRequired,
		auth: PropTypes.object.isRequired,
	};
	handleSignOut = async () => {
		this.props.logout();
	};
	render() {
		const {
			classes,
			ToolbarClasses,
			children,
			isSidebarOpen,
			onToggleSidebar,
		} = this.props;
		return (
			<Fragment>
				<div className={`${classes.root} , ${ToolbarClasses}`}>
					<Toolbar className={classes.toolbar}>
						<div className={classes.brandWrapper}>
							<div className={classes.logo}>
								<Navbar.Brand href="#home" as={Link} to="/" className="m-0">
									<Image src={tickitz_purple} />
								</Navbar.Brand>
							</div>
							<IconButton
								className={classes.menuButton}
								aria-label="Menu"
								onClick={onToggleSidebar}
							>
								{isSidebarOpen ? <CloseIcon /> : <MenuIcon />}
							</IconButton>
						</div>
						<Container className={classes.darkBg}>
							<Navbar.Brand>
								<Link className="nav-link" to="/admin-panel">
									Admin Panel
								</Link>
							</Navbar.Brand>
						</Container>
						<IconButton
							className={classes.notificationsButton}
							onClick={() => console.log('Notification')}
						>
							<Badge
								overlap="rectangular"
								badgeContent={4}
								color="primary"
								variant="dot"
							>
								<NotificationsIcon />
							</Badge>
						</IconButton>
						<IconButton
							className={classes.signOutButton}
							onClick={this.handleSignOut}
						>
							<InputIcon />
						</IconButton>
					</Toolbar>
					{children}
				</div>
			</Fragment>
		);
	}
}

const mapStateToProps = (state) => ({
	auth: state.auth,
	user: state.user,
});

const mapDispatchToProps = { logout, getUserDetail, getUserDetailById };

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(withStyles(styles)(NavbarComponent));
