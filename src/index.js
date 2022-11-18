import React from 'react';
import ReactDOM from 'react-dom';
import reportWebVitals from './reportWebVitals';
import { GlobalStyle } from './assets/styles/GlobalStyles';
import './assets/styles/custom.scss';
import App from './app/App';

ReactDOM.render(
	<React.Fragment>
		<GlobalStyle />
		<App />
	</React.Fragment>,
	document.getElementById('root')
);

reportWebVitals();
