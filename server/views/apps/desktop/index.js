import React from 'react';
import ReactDOM from 'react-dom';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import rootReducer from '../../../../src/reducers/app';
import AppDesktop from './component';

var store = createStore(rootReducer);

ReactDOM.render(
	<Provider store={store}>
		<BrowserRouter basename="/app">
			<AppDesktop/>
		</BrowserRouter>
	</Provider>,
	document.getElementById('root')
);