import $ from 'jquery';

window.jQuery = require('jquery');
window.$ = window.jQuery;

import React from 'react';
import ReactDOM from 'react-dom';
//import { browserHistory as history } from 'react-router';
//const history = createBrowserHistory();
import { browserHistory as history } from 'react-router';
import { createStore } from './util/redux';

console.log("history1: " + (history == null));

import {createApp} from './util/app';
import * as reducers from './reducers';
import { createRouter } from './router';

require('bootstrap/dist/css/bootstrap.css');
require('react-select/dist/default.css');
require('./app.less');
require('bootstrap/dist/js/bootstrap.js');
require('jquery-ui/themes/base/jquery-ui.css');
require('jquery-ui/themes/base/jquery.ui.datepicker.css');

const store = createStore(reducers, history);

const router = createRouter({
    store,
    history
});

const app = createApp(store, history, router);

ReactDOM.render(
	app,
	document.getElementById('page')
);
