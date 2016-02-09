import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';
import LoginView from '../dumb/LoginView';
import Auth0Lock from 'auth0-lock';
import config from '../../../config.server';

export default class LoginViewContainer extends Component {

    componentWillMount() {
        this.setupAjax();
        this.createLock();
        this.setState({idToken: this.getIdToken()})
    }

    createLock() {
        this.lock = new Auth0Lock(config.auth0.client_id, config.auth0.domain);
    }

    setupAjax() {
        $.ajaxSetup({
            'beforeSend': function(xhr) {
                if (localStorage.getItem('userToken')) {
                    xhr.setRequestHeader('Authorization',
                    'Bearer ' + localStorage.getItem('userToken'));
                }
            }
        });
    }    

    getIdToken() {
        var idToken = localStorage.getItem('userToken');
        var authHash = this.lock.parseHash(window.location.hash);
        if (!idToken && authHash) {
            if (authHash.id_token) {
                idToken = authHash.id_token
                localStorage.setItem('userToken', authHash.id_token);
            }

            if (authHash.error) {
                console.log('Error signing in', authHash);
            }
        }

        return idToken;
    }  

    constructor(props) {
        super(props);

        this.state = {
            idToken: null
        }
    }

    render() {

        return (
            <LoginView lock={this.lock} />
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