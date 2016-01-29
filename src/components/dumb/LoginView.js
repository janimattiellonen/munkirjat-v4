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
		  	//location.href = "/";
		  	history.pushState(null, '/');
		});
  	}

	render() {
		return (
			<div className="component">
				<a onClick={::this.showLock} className="btn btn-primary btn-lg btn-login">Sign In</a>
			</div>
		)
	}
};