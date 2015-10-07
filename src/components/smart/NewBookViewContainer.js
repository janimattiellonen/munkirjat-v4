import React, {Component, PropTypes} from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {initialize} from 'redux-form';
import BookForm from '../dumb/BookForm';
import * as AuthorActions from '../../actions/AuthorActions';
import * as BookActions from '../../actions/BookActions';

@connect(
  	() => ({}),
  	function mapDispatchToProps(dispatch) {
        return { 
        	authorActions: bindActionCreators(AuthorActions, dispatch), 
        	bookActions: bindActionCreators(BookActions, dispatch) 
        };
    }
)
export default class NewBookViewContainer extends Component {

    handleSubmit(data) {
        this.props.bookActions.createBook(data);
    }

	render() {
		return (
			<BookForm onSubmit={::this.handleSubmit}/>
		)
	}
}