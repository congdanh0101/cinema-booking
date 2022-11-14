import React from 'react';
import ReactDOM from 'react-dom';
import reportWebVitals from './reportWebVitals';
import { GlobalStyle } from 'assets/styles/GlobalStyles';
import './assets/styles/custom.scss';
import App from './app/App';
import jQuery from 'jquery';
window.$ = window.jQuery = jQuery;

ReactDOM.render(
	<React.StrictMode>
		<GlobalStyle />
		<App />
	</React.StrictMode>,
	document.getElementById('root')
);

reportWebVitals();
