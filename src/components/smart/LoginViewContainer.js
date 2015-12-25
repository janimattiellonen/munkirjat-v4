import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';
import LoginView from '../dumb/LoginView';

export default class LoginViewContainer extends Component {

    render() {

        return (
            <LoginView />
        )
    }
};

function mapStateToProps(state) {
    return {

    };
}

function mapDispatchToProps(dispatch) {
        return { 
            
        };
    }

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(LoginViewContainer);