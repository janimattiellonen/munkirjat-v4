import $ from 'jquery';

window.jQuery = require('jquery');
window.$ = window.jQuery;

import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, Redirect, IndexRoute } from 'react-router';
import history from './components/history';

import MunkirjatAppContainer from './components/smart/MunkirjatAppContainer';
import About from './components/AboutView';
import HomeContainer from './components/smart/HomeContainer';
import NewAuthorViewContainer from './components/smart/NewAuthorViewContainer';
import UpdateAuthorViewContainer from './components/smart/UpdateAuthorViewContainer';
import AuthorViewContainer from './components/smart/AuthorViewContainer';
import AuthorsViewContainer from './components/smart/AuthorsViewContainer';
import BookViewContainer from './components/smart/BookViewContainer';
import BooksViewContainer from './components/smart/BooksViewContainer';
import NewBookViewContainer from './components/smart/NewBookViewContainer';
import UpdateBookViewContainer from './components/smart/UpdateBookViewContainer';
import LoginViewContainer from './components/smart/LoginViewContainer';
import GenresViewContainer from './components/smart/GenresViewContainer';

import { createStore, applyMiddleware, combineReducers } from 'redux';
import thunk from 'redux-thunk';
import { Provider } from 'react-redux';
import promiseMiddleware from 'redux-promise';
//import createHashHistory from 'history/lib/createHashHistory';
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
	            <Route path="about" component={About}/>
	            <Route path="book/new" component={NewBookViewContainer} />
	            <Route path="book/:id/edit" component={UpdateBookViewContainer} />
				<Route path="book/:id" component={BookViewContainer} />
				<Route path="books(/:mode)(/:language)(/:genre)" component={BooksViewContainer} />
				<Route path="authors" component={AuthorsViewContainer} />
				<Route path="author/new" component={NewAuthorViewContainer} />
				<Route path="author/:id/edit" component={UpdateAuthorViewContainer} />
				<Route path="author/:id" component={AuthorViewContainer} />
				<Route path="genres" component={GenresViewContainer} />
				<Route path="login" component={LoginViewContainer} />
				<Route path="access_token/:id" component={LoginViewContainer} />
	        </Route>
	    </Router>	
	</Provider>,
	document.getElementById('page')
);
