import React from 'react';
import ReactDOM from 'react-dom';
import reportWebVitals from './reportWebVitals';
import { GlobalStyle } from './assets/styles/GlobalStyles';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import App from './app/App';

ReactDOM.render(
	<React.Fragment>
		<GlobalStyle />
		<App />
		<ToastContainer />
	</React.Fragment>,
	document.getElementById('root')
);

reportWebVitals();
