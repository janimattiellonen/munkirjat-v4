import React, {Component, PropTypes} from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import AuthorForm from '../dumb/AuthorForm';
import * as AuthorActions from '../../actions/AuthorActions';
import * as BookActions from '../../actions/BookActions';

class NewAuthorViewContainer extends React.Component {

    handleSubmit(data) {
        this.props.authorActions.createAuthor(data);
    }

    render() {
        
        let author = {};
        
        return (
            <AuthorForm key={null} author={author} handleSubmit={::this.handleSubmit} />
        );
    }
}

NewAuthorViewContainer.defaultProps = {
    author: {
        id: null,
        firstname: null,
        lastname: null
    }  
};

function mapStateToProps(state) {
    return {
        author: state.authors.author,
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
)(NewAuthorViewContainer);