import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { withStyles } from '@material-ui/core';
import { ResponsiveDialog } from '../../../../../components/common';
import AddShowtime from '../AddShowtime/AddShowtime';
import { Button } from 'react-bootstrap';
import styles from './styles';

class ShowtimesToolbar extends Component {
	static propTypes = {
		className: PropTypes.string,
		classes: PropTypes.object.isRequired,
	};
	render() {
		const { classes, className, toggleDialog, openDialog } = this.props;
		const rootClassName = classNames(classes.root, className);
		return (
			<Fragment>
				<div className={rootClassName}>
					<div className={classes.row}>
						<Button
							onClick={() => toggleDialog()}
							className="float-right col-12 col-md-2"
							variant="outline-primary"
							block
							size="small"
						>
							{'Add Showtime'}
						</Button>
					</div>
				</div>
			</Fragment>
		);
	}
}

export default withStyles(styles)(ShowtimesToolbar);
