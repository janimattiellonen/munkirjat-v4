import $ from "jquery";

window.jQuery = require('jquery');
window.$ = window.jQuery;

import React from "react";
import ReactDOM from 'react-dom';
import { Router, Route, Redirect, IndexRoute } from 'react-router';
import history from './components/history';

import MunkirjatAppContainer from "./components/smart/MunkirjatAppContainer";
import About from "./components/AboutView";
import HomeContainer from "./components/smart/HomeContainer";
import NewAuthorViewContainer from "./components/smart/NewAuthorViewContainer";
import UpdateAuthorViewContainer from "./components/smart/UpdateAuthorViewContainer";
import AuthorViewContainer from "./components/smart/AuthorViewContainer";
import AuthorsViewContainer from "./components/smart/AuthorsViewContainer";
import BookViewContainer from "./components/smart/BookViewContainer";
import BooksViewContainer from "./components/smart/BooksViewContainer";
import NewBookViewContainer from "./components/smart/NewBookViewContainer";
import UpdateBookViewContainer from "./components/smart/UpdateBookViewContainer";
import LoginViewContainer from "./components/smart/LoginViewContainer";


import GameView from "./components/GameView";
import PlayerSelectionView from "./components/Game/PlayerSelectionView";
import ConfirmSelectionsView from "./components/Game/ConfirmSelectionsView";
import GamePlayView from "./components/Game/GamePlayView";

import { createStore, applyMiddleware, combineReducers } from 'redux';
import thunk from 'redux-thunk';
import { Provider } from 'react-redux';
import promiseMiddleware from 'redux-promise';
import createHashHistory from 'history/lib/createHashHistory';
import store from './store';

require('bootstrap/dist/css/bootstrap.css');
require('react-select/dist/default.css');
require('./app.less');
require('bootstrap/dist/js/bootstrap.js');
require('react-datepicker/dist/react-datepicker.min.css');
require('jquery-ui/themes/base/jquery-ui.css');
require('jquery-ui/themes/base/jquery.ui.datepicker.css');

ReactDOM.render(
	<Provider store = {store}>
		<Router history={history}>
	        <Route component={MunkirjatAppContainer} path="/">
	        	<IndexRoute component={HomeContainer}/>
	            <Route name="about" path="about" component={About}/>
	            <Route name="newBook" path="book/new" component={NewBookViewContainer} />
	            <Route name="editBook" path="book/:id/edit" component={UpdateBookViewContainer} />
				<Route name="book" path="book/:id" component={BookViewContainer} />
				<Route name="listBooks" path="books(/:mode)(/:language)" component={BooksViewContainer} />
				<Route name="listAuthors" path="authors" component={AuthorsViewContainer} />
				<Route name="newAuthor" path="author/new" component={NewAuthorViewContainer} />
				<Route name="editAuthor" path="author/:id/edit" component={UpdateAuthorViewContainer} />
				<Route name="viewAuthor" path="author/:id" component={AuthorViewContainer} />
				<Route name="login" path="login" component={LoginViewContainer} />
				<Route name="afterLogin" path="access_token/:id" component={LoginViewContainer} />
	        </Route>
	    </Router>	
	</Provider>,
	document.getElementById('page')
);
