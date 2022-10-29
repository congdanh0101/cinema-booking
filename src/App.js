// @ts-nocheck
import React, { Component } from 'react';
import { ThemeProvider } from '@material-ui/core/styles';

//Redux
import { Provider } from 'react-redux';
import store from './service';
import { loadUser } from './service/actions';

//Components
import Theme from './shared/theme';
import Routes from './Routes';
import { Alert } from './components';
import { pageCursors } from './shared/utils';

//Styles
import './assets/scss/index.scss';
import { CssBaseline } from '@material-ui/core';

class App extends Component {
	componentDidMount() {
		store.dispatch(loadUser());
		pageCursors();
	}
	render() {
		return (
			<Provider store={store}>
				<ThemeProvider theme={Theme}>
					<CssBaseline />
					<Alert />
					<Routes />
					<div className="cursor" id="cursor" />
					<div className="cursor2" id="cursor2" />
					<div className="cursor3" id="cursor3" />
				</ThemeProvider>
			</Provider>
		);
	}
}
export default App;
