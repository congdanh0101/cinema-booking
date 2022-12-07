import React, { Component } from 'react';
import PropTypes from 'prop-types';
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
} from '@material-ui/core';
import { Portlet, PortletContent } from '../../../../../components/common';
import styles from './styles';

class ShowtimesTable extends Component {
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

	render() {
		const {
			classes,
			className,
			showtimes,
			onSelectShowtime,
			selectedShowtimes,
			selectAllShowtimes,
		} = this.props;

		const rootClassName = classNames(classes.root, className);
		return (
			<Portlet className={rootClassName}>
				<PortletContent noPadding>
					<Table>
						<TableHead>
							<TableRow className={classes.tableRowHeader}>
								<TableCell className={classes.tableCellHeader} align="left">
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
								<TableCell className={classes.tableCellHeader} align="left">
									Movie
								</TableCell>
								<TableCell className={classes.tableCellHeader} align="left">
									Theater
								</TableCell>
								<TableCell className={classes.tableCellHeader} align="left">
									Price
								</TableCell>
								<TableCell className={classes.tableCellHeader} align="left">
									Time Start
								</TableCell>
								<TableCell className={classes.tableCellHeader} align="left">
									Duration
								</TableCell>
								<TableCell className={classes.tableCellHeader} align="left">
									Show Date
								</TableCell>
							</TableRow>
						</TableHead>
						<TableBody>
							{showtimes
								.filter((showtime) => {
									return showtime;
								})
								.map((showtime) => (
									<TableRow
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
											{showtime.movie.duration}
										</TableCell>
										<TableCell className={classes.tableCell}>
											{showtime.showDate}
										</TableCell>
									</TableRow>
								))}
						</TableBody>
					</Table>
				</PortletContent>
			</Portlet>
		);
	}
}

export default withStyles(styles)(ShowtimesTable);
