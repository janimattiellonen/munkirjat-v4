import React, {Component, PropTypes} from 'react';
import {Button} from 'react-bootstrap';
import history from '../history';

export default class LoginView extends Component {
  	showLock() {

    	this.props.lock.show(function(err, profile, id_token) {
		  	if (err) {
		    	console.log('There was an error :/', err);
		    	return;
		  	}

		  	localStorage.setItem('userToken', id_token);
		  	history.pushState(null, '/');
		});
  	}

	render() {
		return (
			<div>
				<p>Login</p>

				<a onClick={::this.showLock} className="btn btn-primary btn-lg btn-login btn-block">Sign In</a>
			</div>
		)
	}
};