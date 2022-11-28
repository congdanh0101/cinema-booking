import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Navbar, Image } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import tickitz_purple from '../../../../assets/images/tickitz-purple.svg';
import { connect } from 'react-redux';

import {
	getUserDetail,
	getUserDetailById,
} from '../../../../service/actions/user';

import { withStyles } from '@material-ui/core/styles';
import { Toolbar, IconButton } from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';
import CloseIcon from '@material-ui/icons/Close';
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
		auth: PropTypes.object.isRequired,
	};
	state = {
		expired: JSON.parse(localStorage.getItem('expiredToken')),
		now: new Date().getTime(),
	};
	async componentDidMount() {
		if (this.props.auth.token !== null) {
			if (this.state.now >= this.state.expired) {
				await this.props.logout();
			} else {
				this.props.getUserDetail(this.props.auth.token).then(async () => {
					await this.props.getUserDetailById(this.props.user.detail.id);
				});
			}
		}
	}
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
							<div className={classes.darkBg}></div>
						</div>
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

const mapDispatchToProps = { getUserDetail, getUserDetailById };

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(withStyles(styles)(NavbarComponent));
