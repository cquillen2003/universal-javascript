import React from 'react';
import ReactDOM from 'react-dom';
import { createStore } from 'redux';
import rootReducer from '../../../../src/reducers/app';
import AppDesktop from './component';

var store = createStore(rootReducer);

ReactDOM.render(
	<AppDesktop/>,
	document.getElementById('root')
);