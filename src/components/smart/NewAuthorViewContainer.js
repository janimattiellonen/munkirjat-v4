import React, {Component, PropTypes} from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import AuthorForm from '../dumb/AuthorForm';
import * as AuthorActions from '../../actions/AuthorActions';
import * as BookActions from '../../actions/BookActions';

class NewAuthorViewContainer extends React.Component {

    componentDidMount() {
        if (this.props.params.id) {
            this.props.authorActions.fetchAuthor(this.props.params.id);
        }   
    }

    componentWillReceiveProps(nextProps) {

        if (this.props.params.id && nextProps.params.id && this.props.params.id != nextProps.params.id) {
            this.props.authorActions.fetchAuthor(nextProps.params.id);
        } 
    }

    handleSubmit(data) {
        this.props.authorActions.updateAuthor(data);
    }

    render() {
        const {author} = this.props;
        return (
            <AuthorForm key={author.id} author={author} params={this.props.params} handleSubmit={::this.handleSubmit} />
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