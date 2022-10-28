import React from 'react';

import './App.css';
import './Assets/scss/index.scss';

import Theme from './Shared/Themes';
import Routes from './Shared/Routes';

import { Alert } from './Views/Common';

import { ThemeProvider } from '@material-ui/core/styles';
import { CssBaseline } from '@material-ui/core';

function App() {
	return (
		<ThemeProvider theme={Theme}>
			{/* <CssBaseline /> */}
			<Routes />
			<div className="cursor" id="cursor" />
			<div className="cursor2" id="cursor2" />
			<div className="cursor3" id="cursor3" />
		</ThemeProvider>
	);
}

export default App;
