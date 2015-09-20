import $ from "jquery";

window.jQuery = require('jquery');
window.$ = window.jQuery;

import React from "react";
import { Router, Route, Redirect } from 'react-router';
import { history } from 'react-router/lib/HashHistory';
import MunkirjatAppContainer from "./components/smart/MunkirjatAppContainer";
import About from "./components/AboutView";
import AuthorViewContainer from "./components/smart/AuthorViewContainer";
import AuthorsViewContainer from "./components/smart/AuthorsViewContainer";
import BooksViewContainer from "./components/smart/BooksViewContainer";


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

require('bootstrap/dist/css/bootstrap.css');
require('./app.less');
require('bootstrap/dist/js/bootstrap.js');

React.render(
	<Provider store = {store}>
		{	() =>
			<Router history={history}>
		        <Redirect from="/" to="/about" />
		        <Route component={MunkirjatAppContainer} path="/">
		            <Route name="about" path="about" component={About}/>
					<Route name="listBooks" path="/books(/:mode)" component={BooksViewContainer} />
					<Route name="listAuthors" path="/authors" component={AuthorsViewContainer} />
					<Route name="viewAuthor" path="/author/:id" component={AuthorViewContainer} />
		        </Route>
		    </Router>	
		}
	</Provider>,
	document.getElementById('page')
);