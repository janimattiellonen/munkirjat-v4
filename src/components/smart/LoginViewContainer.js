import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';
import LoginView from '../dumb/LoginView';
import Auth0Lock from 'auth0-lock';

export default class LoginViewContainer extends Component {

    componentWillMount() {
        this.setupAjax();
        this.createLock();
        this.setState({idToken: this.getIdToken()})
    }

    createLock() {
        this.lock = new Auth0Lock('I8BCbPj0NoYE2jk4YR1t2eZkDJjGdmmN', 'munkirjat.eu.auth0.com');
    }

    setupAjax() {
        $.ajaxSetup({
            'beforeSend': function(xhr) {
                console.log("lll"); 
                if (localStorage.getItem('userToken')) {
                    xhr.setRequestHeader('Authorization',
                    'Bearer ' + localStorage.getItem('userToken'));
                }
            }
        });
    }    

    getIdToken() {
        console.log("getIdToken:1: " + window.location.hash );
        var idToken = localStorage.getItem('userToken');
        var authHash = this.lock.parseHash(window.location.hash);
        if (!idToken && authHash) {
            console.log("getIdToken:2");
            if (authHash.id_token) {
                console.log("getIdToken:3");
                idToken = authHash.id_token
                localStorage.setItem('userToken', authHash.id_token);
            }

            if (authHash.error) {
                console.log("Error signing in", authHash);
            }
        }
        console.log("getIdToken:4");
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