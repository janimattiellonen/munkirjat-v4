import React, {Component, PropTypes} from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {initialize} from 'redux-form';
import AuthorForm from '../dumb/AuthorForm';

@connect(
  () => ({}),
  dispatch => bindActionCreators({initialize}, dispatch)
)
export default class NewAuthorViewContainer extends Component {
	static propTypes = {
    	initialize: PropTypes.func.isRequired
  	}
  	
	handleSubmit(data) {
    	window.alert('Data submitted! ' + JSON.stringify(data));
  	}

	render() {
		return (
			<div>
				<h1>New author</h1>

				<AuthorForm onSubmit={::this.handleSubmit}/>
			</div>
		)
	}
}