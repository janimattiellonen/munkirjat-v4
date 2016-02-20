import React, {Component, PropTypes} from 'react';

import MunkirjatApp from '../dumb/MunkirjatApp';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as CoverActions from '../../actions/CoverActions';
import CoversView from '../dumb/CoversView';
import {List} from 'immutable';

class CoversViewContainer extends React.Component {
    componentWillMount() {
        console.log("lits");
        this.props.coverActions.fetchCovers();
    }

    render() {
        const {covers} = this.props;

        return (
            <CoversView covers={covers} />
        )
    }
}

CoversViewContainer.defaultProps = {
    covers: List()
};

function mapStateToProps(state) {
    return {
        covers: state.covers.covers
    };
}

function mapDispatchToProps(dispatch) {
    return { 
      coverActions: bindActionCreators(CoverActions, dispatch), 
    };
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(CoversViewContainer);
