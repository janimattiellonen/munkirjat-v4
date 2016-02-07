import $ from 'jquery';

window.jQuery = require('jquery');
window.$ = window.jQuery;

import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, IndexRoute } from 'react-router';
//import { browserHistory as history } from 'react-router';
import createBrowserHistory from 'history/lib/createBrowserHistory';
const history = createBrowserHistory();
console.log("history1: " + (history == null));
import {createStore} from './store';
import {createApp} from './util/app';
import {Provider} from 'react-redux';

require('bootstrap/dist/css/bootstrap.css');
require('react-select/dist/default.css');
require('./app.less');
require('bootstrap/dist/js/bootstrap.js');
//require('react-datepicker/dist/react-datepicker.min.css');
require('jquery-ui/themes/base/jquery-ui.css');
require('jquery-ui/themes/base/jquery.ui.datepicker.css');

import * as reducers from './reducers';
const store = createStore(reducers, history);

import {createRoutes} from './routes';

const routes = createRoutes({
    store,
    history
});

const app = createApp(store, history, routes);

ReactDOM.render(
	app,
	document.getElementById('page')
);
