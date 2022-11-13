import React from 'react';
import ReactDOM from 'react-dom';
import reportWebVitals from './reportWebVitals';

import './assets/styles/custom.scss';
import App from './app/App';
import jQuery from 'jquery';
window.$ = window.jQuery = jQuery;

ReactDOM.render(
	<React.StrictMode>
		<App />
	</React.StrictMode>,
	document.getElementById('root')
);

reportWebVitals();
