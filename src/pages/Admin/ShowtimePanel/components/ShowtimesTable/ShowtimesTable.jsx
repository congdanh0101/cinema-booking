import React, { Component } from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import classNames from 'classnames';
import { withStyles } from '@material-ui/core';
import {
	Checkbox,
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableRow,
	Typography,
	TablePagination,
} from '@material-ui/core';
import { Portlet, PortletContent } from '../../../../../components/common';
import { Link } from 'react-router-dom';
import styles from './styles';

class ShowtimesTable extends Component {
	state = {
		rowsPerPage: 10,
		page: 0,
	};

	static propTypes = {
		className: PropTypes.string,
		classes: PropTypes.object.isRequired,
		onSelect: PropTypes.func,
		onShowDetails: PropTypes.func,
		showtimes: PropTypes.array.isRequired,
	};

	static defaultProps = {
		showtimes: [],
		onSelect: () => {},
		onShowDetails: () => {},
	};

	handleChangePage = (event, page) => {
		this.setState({ page });
	};

	handleChangeRowsPerPage = (event) => {
		this.setState({ rowsPerPage: event.target.value });
	};

	render() {
		const {
			classes,
			className,
			showtimes,
			onSelectShowtime,
			selectedShowtimes,
			selectAllShowtimes,
		} = this.props;
		const { rowsPerPage, page } = this.state;
		const rootClassName = classNames(classes.root, className);
		return (
			<Portlet className={rootClassName}>
				<PortletContent noPadding>
					<Table>
						<TableHead>
							<TableRow>
								<TableCell align="left">
									<Checkbox
										checked={selectedShowtimes.length === showtimes.length}
										color="primary"
										indeterminate={
											selectedShowtimes.length > 0 &&
											selectedShowtimes.length < showtimes.length
										}
										onChange={selectAllShowtimes}
									/>
									ID
								</TableCell>
								<TableCell align="left">Movie</TableCell>
								<TableCell align="left">Theater</TableCell>
								<TableCell align="left">Price</TableCell>
								<TableCell align="left">Time Start</TableCell>
								<TableCell align="left">Date</TableCell>
								<TableCell align="left">Options</TableCell>
							</TableRow>
						</TableHead>
						<TableBody>
							{showtimes
								.filter((showtime) => {
									return showtime;
								})
								.slice(0, rowsPerPage)
								.map((showtime) => (
									<TableRow
										className={classes.tableRow}
										hover
										key={showtime.id}
										selected={selectedShowtimes.indexOf(showtime.id) !== -1}
									>
										<TableCell className={classes.tableCell}>
											<div className={classes.tableCellInner}>
												<Checkbox
													checked={
														selectedShowtimes.indexOf(showtime.id) !== -1
													}
													color="primary"
													onChange={() => onSelectShowtime(showtime.id)}
													value="true"
												/>
												<Typography
													className={classes.nameText}
													variant="body1"
												>
													{showtime.id}
												</Typography>
											</div>
										</TableCell>
										<TableCell className={classes.tableCell}>
											{showtime.movie.name}
										</TableCell>
										<TableCell className={classes.tableCell}>
											{showtime.theater.name}
										</TableCell>
										<TableCell className={classes.tableCell}>
											{showtime.price}
										</TableCell>
										<TableCell className={classes.tableCell}>
											{showtime.timeStart}
										</TableCell>
										<TableCell className={classes.tableCell}>
											{showtime.showDate}
										</TableCell>
										<TableCell className={classes.tableCell}>
											<Link to={``} className="btn btn-sm btn-warning">
												Edit
											</Link>{' '}
											<Link to={``} className="btn btn-sm btn-danger">
												Delete
											</Link>
										</TableCell>
									</TableRow>
								))}
						</TableBody>
					</Table>
					<TablePagination
						backIconButtonProps={{
							'aria-label': 'Previous Page',
						}}
						component="div"
						count={showtimes.length}
						nextIconButtonProps={{
							'aria-label': 'Next Page',
						}}
						onPageChange={this.handleChangePage}
						onRowsPerPageChange={this.handleChangeRowsPerPage}
						page={page}
						rowsPerPage={rowsPerPage}
						rowsPerPageOptions={[10]}
					/>
				</PortletContent>
			</Portlet>
		);
	}
}

export default withStyles(styles)(ShowtimesTable);
