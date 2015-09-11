import $ from "jquery";

window.jQuery = require('jquery');
window.$ = window.jQuery;

import React from "react";
import { Router, Route, Redirect } from 'react-router';
import { history } from 'react-router/lib/HashHistory';
import MunkirjatApp from "./components/MunkirjatApp";
import About from "./components/AboutView";
import BooksView from "./components/BooksView";


import GameView from "./components/GameView";
import PlayerSelectionView from "./components/Game/PlayerSelectionView";
import ConfirmSelectionsView from "./components/Game/ConfirmSelectionsView";
import GamePlayView from "./components/Game/GamePlayView";

import { createStore, applyMiddleware, combineReducers } from 'redux';
import thunk from 'redux-thunk';
import { Provider } from 'react-redux';
import * as reducers from './reducers';
import promiseMiddleware from 'redux-promise';

const createStoreWithMiddleware = applyMiddleware(promiseMiddleware, thunk)(createStore);
const reducer = combineReducers(reducers);
const store = createStoreWithMiddleware(reducer);

require('./app.less');
require('bootstrap/dist/css/bootstrap.css');
require('bootstrap/dist/js/bootstrap.js');

React.render(
	<Provider store = {store}>
		{	() =>
			<Router history={history}>
		        <Redirect from="/" to="/about" />
		        <Route component={MunkirjatApp} path="/">
		            <Route name="about" path="about" component={About}/>
					<Route name="listBooks" path="/books" component={BooksView} />
		        </Route>
		    </Router>	
		}
	</Provider>,
	document.getElementById('app')
);
