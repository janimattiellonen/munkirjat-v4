import React, {Component, PropTypes} from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {initialize} from 'redux-form';
import AuthorForm from '../dumb/AuthorForm';
import * as AuthorActions from '../../actions/AuthorActions';
import * as BookActions from '../../actions/BookActions';

@connect(
  	() => ({}),
  	/*dispatch => bindActionCreators({initialize}, dispatch),*/
  	function mapDispatchToProps(dispatch) {
        return { 
        	authorActions: bindActionCreators(AuthorActions, dispatch), 
        	bookActions: bindActionCreators(BookActions, dispatch) 
        };
    }
)
export default class NewAuthorViewContainer extends Component {
	/*static propTypes = {
    	initialize: PropTypes.func.isRequired
  	}
*/
	handleSubmit(data) {
    	this.props.authorActions.createAuthor(data);
  	}

	render() {
		return (
			<AuthorForm onSubmit={::this.handleSubmit}/>
		)
	}
}