import React from 'react';
import Router, {RouteHandler} from 'react-router';
import { connect } from 'react-redux';

import StatisticsView from './StatisticsView';

export default class MunkirjatApp extends React.Component {
    static contextTypes = {
        history: React.PropTypes.object.isRequired
    }

    render() {
       // alert('https://www.npmjs.com/package/basic-authorization-header');
        return (
            <div id="page-inner">

                {this.props.children}

                <StatisticsView books={this.props.books} authors={this.props.authors} />

            </div>
        );
    }

    componentWillMount() {
        this.props.bookActions.fetchBooks();
        this.props.authorActions.fetchAuthors();
    }
}
