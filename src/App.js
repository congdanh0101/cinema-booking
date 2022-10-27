import './App.css';
import './Assets/scss/index.scss';
import logo from './assets/logo.svg';

import React, { Component } from 'react';

import { Provider } from 'react-redux';

import theme from './Shared/Themes';
import { Alert } from './Views/Components';
import { pageCursors } from './Shared';
import Routes from './Shared/Routes';

import { ThemeProvider } from '@material-ui/core/styles';
import { CssBaseline } from '@material-ui/core';

class App extends Component {
	componentDidMount() {
		pageCursors();
	}
	render() {
		return (
			<div className="App">
				<header className="App-header">
					<img src={logo} className="App-logo" alt="logo" />
					<Provider>
						<ThemeProvider theme={theme}>
							<CssBaseline />
							<Alert />
							<Routes />
							<div className="cursor" id="cursor" />
							<div className="cursor2" id="cursor2" />
							<div className="cursor3" id="cursor3" />
						</ThemeProvider>
					</Provider>
				</header>
			</div>
		);
	}
}

export default App;
