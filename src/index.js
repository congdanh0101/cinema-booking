import React from 'react';
import ReactDOM from 'react-dom';
import * as serviceWorker from './serviceWorker';
import reportWebVitals from './reportWebVitals';

import './custom.scss';
import App from './App';
import jQuery from 'jquery';
window.$ = window.jQuery = jQuery;

ReactDOM.render(
	<React.StrictMode>
		<App />
	</React.StrictMode>,
	document.getElementById('root')
);

reportWebVitals();

serviceWorker.unregister();
