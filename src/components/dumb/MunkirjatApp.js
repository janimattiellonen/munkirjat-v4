import React from 'react';
import Router, {RouteHandler} from 'react-router';
import { connect } from 'react-redux';

import StatisticsView from './StatisticsView';

export default class MunkirjatApp extends React.Component {
    static contextTypes = {
        history: React.PropTypes.object.isRequired
    }

    render() {

        console.log("1oo: " + this.props.params.id);

        return (
            <div id="page-inner">

                {this.props.children}
                
                <StatisticsView books={this.props.books} authors={this.props.authors} />

            </div>
        );
    }

    componentDidMount() {
        this.props.bookActions.fetchBooks();
        this.props.authorActions.fetchAuthors();
    }
}
