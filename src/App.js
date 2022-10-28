import React from 'react';

import './App.css';
import './Assets/scss/index.scss';

import Theme from './Shared/Themes';
import Routes from './Shared/Routes';

import { Alert } from './Views/Common';

import { ThemeProvider } from '@material-ui/core/styles';
import { CssBaseline } from '@material-ui/core';

import ListMovie from './Views/Components/Client/Movies';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

function App() {
	return (
		<ThemeProvider theme={Theme}>
			<CssBaseline />
			<Routes />
			<div className="cursor" id="cursor" />
			<div className="cursor2" id="cursor2" />
			<div className="cursor3" id="cursor3" />
		</ThemeProvider>
	);
}

export default App;
