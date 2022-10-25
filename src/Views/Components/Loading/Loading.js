// @ts-nocheck
import React from 'react';
import { makeStyles } from '@material-ui/styles';

const useStyles = makeStyles((theme) => ({
	root: { background: theme.palette.common.black, height: '100vh' },
}));

const Loading = () => {
	const classes = useStyles();
	return <div className={classes.root} />;
};

export default Loading;
