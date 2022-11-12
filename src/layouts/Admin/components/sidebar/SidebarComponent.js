import React, { Component } from 'react';
import { connect } from 'react-redux';
import { NavLink } from 'react-router-dom';
import {
	withStyles,
	Divider,
	List,
	ListItem,
	ListItemIcon,
	ListItemText,
	ListSubheader,
} from '@material-ui/core';
import DashboardIcon from '@material-ui/icons/DashboardOutlined';
import PeopleIcon from '@material-ui/icons/PeopleOutlined';
import InfoIcon from '@material-ui/icons/InfoOutlined';
import AccountBoxIcon from '@material-ui/icons/AccountBoxOutlined';

// Component styles
import styles from './styles';

class Sidebar extends Component {
	render() {
		const { classes, user } = this.props;
		return (
			<section className={classes.root}>
				<List component="div" disablePadding>
					<ListItem
						activeClassName={classes.activeListItem}
						className={classes.listItem}
						component={NavLink}
						style={{ textDecoration: 'none' }}
						to="/admin-panel/dashboard"
					>
						<ListItemIcon className={classes.listItemIcon}>
							<DashboardIcon />
						</ListItemIcon>
						<ListItemText
							classes={{ primary: classes.listItemText }}
							primary="Dashboard"
						/>
					</ListItem>
					<ListItem
						activeClassName={classes.activeListItem}
						className={classes.listItem}
						component={NavLink}
						style={{ textDecoration: 'none' }}
						to="/admin-panel/movies"
					>
						<ListItemIcon className={classes.listItemIcon}>
							<DashboardIcon />
						</ListItemIcon>
						<ListItemText
							classes={{ primary: classes.listItemText }}
							primary="Movies"
						/>
					</ListItem>
					<ListItem
						activeClassName={classes.activeListItem}
						className={classes.listItem}
						component={NavLink}
						style={{ textDecoration: 'none' }}
						to="/admin/tickets"
					>
						<ListItemIcon className={classes.listItemIcon}>
							<DashboardIcon />
						</ListItemIcon>
						<ListItemText
							classes={{ primary: classes.listItemText }}
							primary="Tickets"
						/>
					</ListItem>
					<ListItem
						activeClassName={classes.activeListItem}
						className={classes.listItem}
						component={NavLink}
						style={{ textDecoration: 'none' }}
						to="/admin/showtimes"
					>
						<ListItemIcon className={classes.listItemIcon}>
							<PeopleIcon />
						</ListItemIcon>
						<ListItemText
							classes={{ primary: classes.listItemText }}
							primary="Showtimes"
						/>
					</ListItem>
					{user && user.role === 'superadmin' && (
						<ListItem
							activeClassName={classes.activeListItem}
							className={classes.listItem}
							component={NavLink}
							style={{ textDecoration: 'none' }}
							to="/admin/users"
						>
							<ListItemIcon className={classes.listItemIcon}>
								<PeopleIcon />
							</ListItemIcon>
							<ListItemText
								classes={{ primary: classes.listItemText }}
								primary="Users"
							/>
						</ListItem>
					)}
					<ListItem
						activeClassName={classes.activeListItem}
						className={classes.listItem}
						component={NavLink}
						style={{ textDecoration: 'none' }}
						to="/admin/account"
					>
						<ListItemIcon className={classes.listItemIcon}>
							<AccountBoxIcon />
						</ListItemIcon>
						<ListItemText
							classes={{ primary: classes.listItemText }}
							primary="Account"
						/>
					</ListItem>
				</List>
				<Divider className={classes.listDivider} />
				<List
					component="div"
					disablePadding
					subheader={
						<ListSubheader className={classes.listSubheader}>
							Support
						</ListSubheader>
					}
				>
					<ListItem
						className={classes.listItem}
						component="a"
						style={{ textDecoration: 'none' }}
						href="https://github.com/congdanh0101/cinema-booking"
						target="_blank"
					>
						<ListItemIcon className={classes.listItemIcon}>
							<InfoIcon />
						</ListItemIcon>
						<ListItemText
							classes={{ primary: classes.listItemText }}
							primary="Customer support"
						/>
					</ListItem>
				</List>
			</section>
		);
	}
}

const mapStateToProps = (state) => ({
	user: state.user,
});

const mapDispatchToProps = {};

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(withStyles(styles)(Sidebar));
