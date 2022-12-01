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
} from '@material-ui/core';
import { Portlet, PortletContent } from '../../../../../components/common';
import styles from './styles';

class GenreTable extends Component {
	static propTypes = {
		className: PropTypes.string,
		classes: PropTypes.object.isRequired,
		genres: PropTypes.array.isRequired,
	};

	static defaultProps = {
		genres: [],
	};

	render() {
		const { classes, className, genres } = this.props;
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
				</PortletContent>
			</Portlet>
		);
	}
}

export default withStyles(styles)(GenreTable);
