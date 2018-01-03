import React from 'react';
import ReactDOM from 'react-dom';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import rootReducer from '../../../../src/reducers/app';
import AppDesktop from './component';

var store = createStore(rootReducer);

ReactDOM.hydrate(
	<Provider store={store}>
		<AppDesktop/>
	</Provider>,
	document.getElementById('root')
);