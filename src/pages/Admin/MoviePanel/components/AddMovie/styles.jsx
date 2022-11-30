const styles = (theme) => ({
	root: {},
	title: {
		textTransform: 'uppercase',
		textAlign: 'center',
	},
	field: {
		margin: theme.spacing(3),
		display: 'flex',
	},
	textField: {
		textTransform: 'capitalize',
		width: '100%',
		marginRight: theme.spacing(3),
	},
	textFieldSelect: {
		textTransform: 'capitalize',
		width: '100%',
		height: '55px',
		marginRight: theme.spacing(3),
		borderRadius: '10px',
	},
	upload: {
		width: '100%',
		marginTop: theme.spacing(1),
		marginRight: theme.spacing(1),
	},
	customClass: {
		backgroundColor: theme.palette.primary.main,
	},
	portletFooter: {
		paddingLeft: theme.spacing(3),
		paddingRight: theme.spacing(3),
		paddingTop: theme.spacing(2),
		paddingBottom: theme.spacing(2),
	},
	buttonFooter: {
		minHeight: '56px',
		borderRadius: '14px',
	},

	infoMessage: {
		marginLeft: theme.spacing(3),
	},
});

export default styles;
