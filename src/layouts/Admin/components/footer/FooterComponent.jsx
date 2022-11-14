import React from 'react';
import { Divider, Typography, Link } from '@material-ui/core';
import { Container } from 'react-bootstrap';
import { withRouter } from 'react-router-dom';
import useStyles from './styles';

function FooterComponent() {
	const classes = useStyles();
	return (
		<footer>
			<Container fluid>
				<div className={classes.root}>
					<Divider />
					<Typography className={classes.copyright} variant="body1">
						&copy; Nguyễn Thanh Minh Đức & Bùi Công Danh
					</Typography>
					<Typography variant="caption">
						Crafted with love |{' '}
						<Link
							href="https://github.com/congdanh0101/cinema-booking"
							target="_blank"
							rel="noopener"
						>
							Nguyễn Thanh Minh Đức & Bùi Công Danh
						</Link>
					</Typography>
				</div>
			</Container>
		</footer>
	);
}

export default withRouter(FooterComponent);
