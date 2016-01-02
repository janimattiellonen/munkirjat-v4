import React, {Component, PropTypes} from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import BookForm from '../dumb/BookForm';
import * as AuthorActions from '../../actions/AuthorActions';
import * as BookActions from '../../actions/BookActions';

export default class NewBookViewContainer extends Component {

    handleSubmit(data) {
        this.props.bookActions.createBook(data);
    }

	render() {
        let book = {};

		return (
			<BookForm key={null} book={book} handleSubmit={::this.handleSubmit}/>
		)
	}
}

NewBookViewContainer.defaultProps = {
    book: {
        id: null,
        title: null,
        language: null,
        authors: null,
        genres: null,
        pageCount: null,
        price: null,
        isRead: false,
        startedReading: null,
        finishedReading: null
    }  
};

function mapStateToProps(state) {
    return {
        book: state.books.book,
    };
}

function mapDispatchToProps(dispatch) {
        return { 
            authorActions: bindActionCreators(AuthorActions, dispatch), 
            bookActions: bindActionCreators(BookActions, dispatch) 
        };
    }

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(NewBookViewContainer);