import React from 'react';
import classnames from 'classnames';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/styles';
import { Card, CardContent, Grid, Typography, Avatar } from '@material-ui/core';
import TheatersIcon from '@material-ui/icons/Theaters';

const useStyles = makeStyles((theme) => ({
	root: {
		height: '100%',
	},
	content: {
		alignItems: 'center',
		display: 'flex',
	},
	title: {
		fontWeight: 700,
	},
	avatar: {
		backgroundColor: theme.palette.error.main,
		height: 56,
		width: 56,
	},
	icon: {
		height: 32,
		width: 32,
	},
	difference: {
		marginTop: theme.spacing(2),
		display: 'flex',
		alignItems: 'center',
	},
	differenceIcon: {
		color: theme.palette.error.dark,
	},
	differenceValue: {
		color: theme.palette.error.dark,
		marginRight: theme.spacing(1),
	},
}));

const TotalTickets = (props) => {
	const { className, tickets } = props;

	const classes = useStyles();

	return (
		<Card className={classnames(classes.root, className)}>
			<CardContent>
				<Grid container style={{ justifyContent: 'space-between' }}>
					<Grid item>
						<Typography
							className={classes.title}
							color="textSecondary"
							gutterBottom
							variant="body2"
						>
							TOTAL TICKETS
						</Typography>
						<Typography variant="h3">{tickets}</Typography>
					</Grid>
					<Grid item>
						<Avatar className={classes.avatar}>
							<TheatersIcon className={classes.icon} />
						</Avatar>
					</Grid>
				</Grid>
			</CardContent>
		</Card>
	);
};

TotalTickets.propTypes = {
	className: PropTypes.string,
};

export default TotalTickets;
