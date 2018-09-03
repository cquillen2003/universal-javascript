import React from 'react';
import ReactDOM from 'react-dom';
import { createStore, applyMiddleware } from 'redux';
import thunkMiddleware from 'redux-thunk';
import rootReducer from '../../../../src/reducers/app';
import AppDesktop from './component';
import cashay from '../../../../src/cashay';

/*
var state = window.__PRELOADED_STATE__;
delete window.__PRELOADED_STATE__;
*/

/*
I created this simplified index.js file to support adding a Layout component as
in the service-base code base.
This simplified index.js file does not support server-side rendering because
AppDesktop contains the BrowserRouter and not the StaticRouter used on the server.
*/

var store = createStore(rootReducer, applyMiddleware(thunkMiddleware));

cashay.create({ store: store });

ReactDOM.render(<AppDesktop store={store}/>, document.getElementById('root'));