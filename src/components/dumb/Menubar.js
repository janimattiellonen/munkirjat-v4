import React, {Component} from 'react';
import history from '../history';

export default class Menubar extends Component {
	render() {
		return (
		    <div className="navbar navbar-inverse navbar-fixed-top" >
		        <div className="container">
		            <div className="navbar-header">
		                <button type="button" className="navbar-toggle collapsed" data-toggle="collapse" data-target=".navbar-collapse">
		                    <span className="sr-only">Toggle navigation</span>
		                    <span className="icon-bar"></span>
		                    <span className="icon-bar"></span>
		                    <span className="icon-bar"></span>
		                </button>
		                <a className="navbar-brand" href="#">Munkirjat.com</a>
		            </div>
		            <div className="collapse navbar-collapse">
		                <ul className="nav navbar-nav">
		                    <li><a href="/#">Home</a></li>
		                    <li><a href="/#/about">About</a></li>
		                    <li><a href="/#books">Books</a></li>
		                    <li><a href="/#books/read">Read books</a></li>
		                    <li><a href="/#books/unread">Unread books</a></li>
		                    <li><a href="/#authors">Authors</a></li>

		                    {this.renderNewBookMenuitem()}
		                    {this.renderNewAuthorMenuitem()}
		                    {this.renderUserMenuitem()}
		                </ul>
		            </div>
		        </div>       
		    </div>
		)
	}

	renderNewBookMenuitem() {
		if (this.isLoggedIn()) {
			return (
				<li><a href="/#/book/new">New book</a></li>
			)
		}
	}

	renderNewAuthorMenuitem() {
		if (this.isLoggedIn()) {
			return (
				<li><a href="/#/author/new">New author</a></li>
			)
		}
	}

	renderUserMenuitem() {
		if (this.isLoggedIn()) {
			return (
				<li><a href="#" id="logout-link" onClick={this.logout}>Logout</a></li>
			)
		} else {
			return (
				<li><a href="/#/login">Login</a></li>
			)
		}
	}

	isLoggedIn() {
		return localStorage.getItem("userToken") != null;
	}

	logout(e) {
		e.preventDefault();

        localStorage.removeItem('userToken');
        history.pushState(null, '/');
	}
};