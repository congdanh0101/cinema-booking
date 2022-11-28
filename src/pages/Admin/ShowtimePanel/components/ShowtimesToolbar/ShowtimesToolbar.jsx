import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { withStyles, IconButton } from '@material-ui/core';
import { Delete as DeleteIcon } from '@material-ui/icons';
import { Button } from 'react-bootstrap';
import styles from './styles';

class ShowtimesToolbar extends Component {
	static propTypes = {
		className: PropTypes.string,
		classes: PropTypes.object.isRequired,
		selectedShowtimes: PropTypes.array,
	};

	static defaultProps = {
		selectedShowtimes: [],
	};

	render() {
		const {
			classes,
			className,
			toggleDialog,
			selectedShowtimes,
			deleteShowtime,
		} = this.props;
		const rootClassName = classNames(classes.root, className);

		return (
			<Fragment>
				<div className={rootClassName}>
					<div className={classes.row}>
						<div className={classes.row}>
							{selectedShowtimes.length > 0 && (
								<IconButton
									className={classes.deleteButton}
									onClick={deleteShowtime}
								>
									<DeleteIcon />
								</IconButton>
							)}
							<Button
								onClick={() => toggleDialog()}
								className="float-right"
								block
								variant="outline-primary"
							>
								{selectedShowtimes.length === 1
									? 'Edit Showtime'
									: 'Add Showtime'}
							</Button>
						</div>
					</div>
				</div>
			</Fragment>
		);
	}
}

export default withStyles(styles)(ShowtimesToolbar);
