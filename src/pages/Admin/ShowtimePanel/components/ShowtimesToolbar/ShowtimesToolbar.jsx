import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { withStyles } from '@material-ui/core';
import { Button, IconButton } from '@material-ui/core';
import { Delete as DeleteIcon } from '@material-ui/icons';
import { ResponsiveDialog } from '../../../../../components/common';
import AddShowtime from '../AddShowtime/AddShowtime';
import styles from './styles';

class ShowtimesToolbar extends Component {
	state = {
		openAddDialog: false,
	};

	OpenAddDialog() {
		this.setState({ openAddDialog: true });
	}

	CloseAddDialog() {
		this.setState({ openAddDialog: false });
	}

	static propTypes = {
		className: PropTypes.string,
		classes: PropTypes.object.isRequired,
		selectedShowtimes: PropTypes.array,
	};

	static defaultProps = {
		selectedShowtimes: [],
	};

	render() {
		const { openAddDialog } = this.state;
		const {
			classes,
			className,
			selectedShowtimes,
			toggleDialog,
			deleteShowtime,
		} = this.props;
		const rootClassName = classNames(classes.root, className);

		return (
			<Fragment>
				<div className={rootClassName}>
					<div className={classes.row}>
						<div>
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
								color="primary"
								size="small"
								variant="outlined"
							>
								{selectedShowtimes.length === 1 ? 'Edit' : 'Add'}
							</Button>
						</div>
					</div>
				</div>
			</Fragment>
		);
	}
}

export default withStyles(styles)(ShowtimesToolbar);
