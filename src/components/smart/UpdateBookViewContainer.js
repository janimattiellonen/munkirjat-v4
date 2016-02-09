import React, {Component, PropTypes} from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import BookForm from '../dumb/BookForm';
import * as AuthorActions from '../../actions/AuthorActions';
import * as BookActions from '../../actions/BookActions';

class UpdateBookViewContainer extends React.Component {
    componentWillMount() {
        if (this.props.params.id) {
            this.props.bookActions.fetchBookInfo(this.props.params.id);
        }   
    }

    componentWillReceiveProps(nextProps) {
        if (this.props.params.id && nextProps.params.id && this.props.params.id != nextProps.params.id) {
            this.props.bookActions.fetchBookInfo(nextProps.params.id);
        } 
    }

    render() {
        const {book} = this.props;

        return (
            <BookForm key={book.id} book={book} params={this.props.params} handleSubmit={::this.handleSubmit} />
        );
    }

    handleSubmit(data) {
        this.props.bookActions.updateBook(data);
    }
}

UpdateBookViewContainer.defaultProps = {
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
)(UpdateBookViewContainer);