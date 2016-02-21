import React, {Component, PropTypes} from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import UploadCoverForm from '../dumb/UploadCoverForm';
import * as CoverActions from '../../actions/CoverActions';

class UploadCoverViewContainer extends React.Component {

    handleFileSubmit(file, data) {
        this.props.coverActions.uploadFile(file, data);
    }

    render() {

        return (
            <div className="component">
            	<UploadCoverForm handleFileSubmit={::this.handleFileSubmit} />
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
       
    };
}

function mapDispatchToProps(dispatch) {
    return { 
      	coverActions: bindActionCreators(CoverActions, dispatch)
    };
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(UploadCoverViewContainer);