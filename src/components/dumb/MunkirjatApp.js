import React from 'react';
import Router, {RouteHandler} from 'react-router';
import { connect } from 'react-redux';

import StatisticsView from './StatisticsView';

export default class MunkirjatApp extends React.Component {
    static contextTypes = {
        router: React.PropTypes.object.isRequired
    }

    render() {
        return (
            <div id="page-inner">
                {this.props.children && React.cloneElement(
                    this.props.children,
                    {
                        authors: this.props.authors
                    }
                )}

                <StatisticsView books={this.props.books} authors={this.props.authors} />

            </div>
        );
    }

    componentDidMount() {
        this.props.bookActions.fetchBooks();
        this.props.authorActions.fetchAuthors();
    }
}
