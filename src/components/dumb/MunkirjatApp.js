import React from 'react';
import Router, {RouteHandler} from 'react-router';
import { connect } from 'react-redux';

import * as BookActions from '../../actions/BookActions';
import { bindActionCreators } from 'redux';

export default class MunkirjatApp extends React.Component {
    static contextTypes = {
        router: React.PropTypes.object.isRequired
    }

    render() {

        return (
            <div id="page">
                {this.props.children && React.cloneElement(
                    this.props.children,
                    {
                       // books: this.props.books,
                        //bookActions: this.props.bookActions
                    }
                )}
            </div>
        );
    }
}
