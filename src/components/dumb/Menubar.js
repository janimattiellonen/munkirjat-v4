import React, {Component} from 'react';
import history from '../history';
import * as Utils from '../utils';
import {Link} from 'react-router';

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
		                <Link className="navbar-brand" to="/">Munkirjat.com</Link>
		            </div>
		            <div className="collapse navbar-collapse">
		                <ul className="nav navbar-nav">
		                    <li><Link to="/">Home</Link></li>
		                    <li><Link to="/about">About</Link></li>
		                    <li><Link to="/books">Books</Link></li>
		                    <li><Link to="/books/read">Read books</Link></li>
		                    <li><Link to="/books/unread">Unread books</Link></li>
		                    <li><Link to="/authors">Authors</Link></li>

		                    {this.renderNewBookMenuitem()}
		                    {this.renderNewAuthorMenuitem()}

		                    <li><Link to="/genres">Genres</Link></li>

		                    {this.renderUserMenuitem()}
		                </ul>
		            </div>
		        </div>
		    </div>
		)
	}

	renderNewBookMenuitem() {
		if (Utils.isLoggedIn()) {
			return (
				<li><Link to="/book/new">New book</Link></li>
			)
		}
	}

	renderNewAuthorMenuitem() {
		if (Utils.isLoggedIn()) {
			return (
				<li><Link to="/author/new">New author</Link></li>
			)
		}
	}

	renderUserMenuitem() {
		if (Utils.isLoggedIn()) {
			return (
				<li><a href="#" id="logout-link" onClick={this.logout}>Logout</a></li>
			)
		} else {
			return (
				<li><Link to="/login">Login</Link></li>
			)
		}
	}

	logout(e) {
		e.preventDefault();

        localStorage.removeItem('userToken');
        location.href = "/";
	}
};
