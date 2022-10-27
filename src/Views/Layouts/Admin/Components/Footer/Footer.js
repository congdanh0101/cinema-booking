import React from 'react';
import { Divider, Typography, Link } from '@material-ui/core';
import useStyles from './styles';

export default function Footer() {
	const classes = useStyles();
	return (
		<div className={classes.root}>
			<Divider />
			<Typography className={classes.copyright} variant="body1">
				&copy; Nguyễn Thanh Minh Đức & Bùi Công Danh
			</Typography>
			<Typography variant="caption">
				Crafted with love |{' '}
				<Link
					href="https://github.com/congdanh0101/cinema-booking/"
					target="_blank"
					rel="noopener"
				>
					Nguyễn Thanh Minh Đức & Bùi Công Danh
				</Link>
			</Typography>
		</div>
	);
}
