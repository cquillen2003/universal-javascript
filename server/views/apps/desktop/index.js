import React from 'react';
import ReactDOM from 'react-dom';
import { createStore, applyMiddleware } from 'redux';
import thunkMiddleware from 'redux-thunk';
import rootReducer from '../../../../src/reducers/app';
import AppDesktop from './component';

/*
var state = window.__PRELOADED_STATE__;
delete window.__PRELOADED_STATE__;
*/

var store = createStore(rootReducer, applyMiddleware(thunkMiddleware));

ReactDOM.render(<AppDesktop store={store}/>, document.getElementById('root'));