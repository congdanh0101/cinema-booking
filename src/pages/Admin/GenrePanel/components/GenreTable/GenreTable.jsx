import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { withStyles } from '@material-ui/core';
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableRow,
	Typography,
	TablePagination,
} from '@material-ui/core';
import { Portlet, PortletContent } from '../../../../../components/common';
import styles from './styles';

class GenreTable extends Component {
	state = {
		rowsPerPage: 10,
		page: 0,
	};

	static propTypes = {
		className: PropTypes.string,
		classes: PropTypes.object.isRequired,
		onSelect: PropTypes.func,
		onShowDetails: PropTypes.func,
		genres: PropTypes.array.isRequired,
	};

	static defaultProps = {
		genres: [],
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
		const { classes, className, genres } = this.props;
		const { rowsPerPage, page } = this.state;
		const rootClassName = classNames(classes.root, className);
		return (
			<Portlet className={rootClassName}>
				<PortletContent noPadding>
					<Table>
						<TableHead>
							<TableRow className={classes.tableRowHeader}>
								<TableCell className={classes.tableCellHeader} align="center">
									Genre ID
								</TableCell>
								<TableCell className={classes.tableCellHeader} align="center">
									Genre Name
								</TableCell>
							</TableRow>
						</TableHead>
						<TableBody>
							{genres
								.filter((genre) => {
									return genre;
								})
								.slice(0, rowsPerPage)
								.map((genre) => (
									<TableRow hover key={genre.id}>
										<TableCell className={classes.tableCell} align="center">
											<Typography className={classes.nameText} variant="body1">
												{genre.id}
											</Typography>
										</TableCell>
										<TableCell className={classes.tableCell} align="center">
											{genre.name}
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
						count={genres.length}
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

export default withStyles(styles)(GenreTable);
