import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { withStyles } from '@material-ui/core';
import { Input } from '@material-ui/core';
import { Search as SearchIcon } from '@material-ui/icons';

const styles = (theme) => ({
	root: {
		alignItems: 'center',
		backgroundColor: theme.palette.background.paper,
		border: `1px solid ${theme.palette.common.neutral}`,
		borderRadius: '4px',
		display: 'flex',
		flexBasis: '420px',
		paddingBottom: theme.spacing(0.5),
		paddingLeft: theme.spacing(1),
		paddingRight: theme.spacing(1),
		paddingTop: theme.spacing(0.5),
	},
	icon: {
		marginRight: theme.spacing(1),
		color: theme.palette.text.secondary,
	},
	input: {
		flexGrow: 1,
		fontSize: '14px',
		lineHeight: '16px',
		letterSpacing: '-0.05px',
	},
});

const SearchInput = (props) => {
	const { classes, className, onChange, style, ...rest } = props;

	const rootClassName = classNames(classes.root, className);

	return (
		<div className={rootClassName} style={style}>
			<SearchIcon className={classes.icon} />
			<Input
				{...rest}
				className={classes.input}
				disableUnderline
				onChange={onChange}
			/>
		</div>
	);
};

SearchInput.propTypes = {
	className: PropTypes.string,
	classes: PropTypes.object.isRequired,
	onChange: PropTypes.func,
	style: PropTypes.object,
};

SearchInput.defaultProps = {
	onChange: () => {},
};

export default withStyles(styles)(SearchInput);
