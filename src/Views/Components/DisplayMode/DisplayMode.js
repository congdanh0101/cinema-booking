import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { withStyles } from '@material-ui/core';
import { List as ListIcon, Apps as AppsIcon } from '@material-ui/icons';

const styles = (theme) => ({
	root: {
		flexGrow: 0,
		flexShrink: 0,
		overflow: 'hidden',
		borderRadius: '5px',
		display: 'inline-flex',
		border: `1px solid ${theme.palette.border}`,
	},
	option: {
		cursor: 'pointer',
		display: 'flex',
		alignItems: 'center',
		padding: theme.spacing(1),
		backgroundColor: theme.palette.background.paper,
	},
	optionSelected: {
		backgroundColor: theme.palette.background.default,
		color: theme.palette.primary.main,
	},
	divider: {
		width: '1px',
		backgroundColor: theme.palette.divider,
	},
});

const DisplayMode = (props) => {
	const { classes, className, mode, onChange } = props;

	const rootClassName = classNames(classes.root, className);

	return (
		<div className={rootClassName}>
			<span
				className={classNames({
					[classes.option]: true,
					[classes.optionSelected]: mode === 'grid',
				})}
				onClick={onChange}
			>
				<AppsIcon className={classes.displayIcon} />
			</span>
			<span className={classes.divider} />
			<span
				className={classNames({
					[classes.option]: true,
					[classes.optionSelected]: mode === 'list',
				})}
				onClick={onChange}
			>
				<ListIcon className={classes.displayIcon} />
			</span>
		</div>
	);
};

DisplayMode.propTypes = {
	className: PropTypes.string,
	classes: PropTypes.object.isRequired,
	mode: PropTypes.oneOf(['grid', 'list']),
	onChange: PropTypes.func,
};

DisplayMode.defaultProps = {
	mode: 'grid',
	onChange: () => {},
};

export default withStyles(styles)(DisplayMode);
