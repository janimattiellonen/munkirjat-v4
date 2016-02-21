import React, {Component, PropTypes} from 'react';

import MunkirjatApp from '../dumb/MunkirjatApp';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as BookActions from '../../actions/BookActions';
import * as CoverActions from '../../actions/CoverActions';
import CoversView from '../dumb/CoversView';

import {List} from 'immutable';

class CoversViewContainer extends React.Component {
    componentWillMount() {
        this.props.coverActions.fetchCovers();
    }

    render() {
        const {books, covers} = this.props;

        return (
            <CoversView books={books} covers={covers} {...this.props} />
        )
    }
}

CoversViewContainer.defaultProps = {
    params: {},
    books: List(),
    covers: List()
};

function mapStateToProps(state) {
    return {
        books: state.books.books,
        mode: state.books.mode,
        covers: state.covers.covers
    };
}

function mapDispatchToProps(dispatch) {
    return { 
        bookActions: bindActionCreators(BookActions, dispatch),
        coverActions: bindActionCreators(CoverActions, dispatch), 
    };
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(CoversViewContainer);
