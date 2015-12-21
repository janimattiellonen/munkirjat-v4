import React, {Component, PropTypes} from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import Home from '../Home';
import * as AuthorActions from '../../actions/AuthorActions';
import * as BookActions from '../../actions/BookActions';

export default class HomeContainer extends Component {

    handleSubmit(data) {
        this.props.bookActions.createBook(data);
    }

    render() {
        const {authors, books} = this.props;

        return (
            <Home authors={authors} books={books}/>
        )
    }
}

function mapStateToProps(state) {
    return {
        authors: state.authors.authors,
        books: state.books.books,
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
)(HomeContainer);