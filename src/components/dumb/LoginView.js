import React, {Component, PropTypes} from 'react';
import {Button} from 'react-bootstrap';

export default class LoginView extends Component {
  	showLock() {
    	/*this.props.lock.show({
    		callbackURL: 'http://localhost:5688',
    		responseType: 'token'
    	});
*/

		let self = this;
    	this.props.lock.show(function(err, profile, id_token) {
		  	if (err) {
		    	console.log("There was an error :/", err);
		    	return;
		  	}

		  	localStorage.setItem('userToken', id_token);
		  	console.log("token: " + id_token);
		  	console.log("token 2: " + self.props.lock.parseHash(id_token));
		  	console.log("Hey dude", profile);
			}
		)
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