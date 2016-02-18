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

    handleFileSubmit(file, data) {
        console.log("NewAuthorViewContainer::handleFileSubmit");
        this.props.authorActions.uploadFile(file, data);
    }

    render() {
        
        let author = {};
        console.log("NewAuthorViewContainer::render");
        return (
            <AuthorForm key={null} author={author} handleSubmit={::this.handleSubmit} handleFileSubmit={::this.handleFileSubmit}/>
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