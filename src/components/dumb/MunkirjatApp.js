import React from 'react';
import Router, {RouteHandler} from 'react-router';
import { connect } from 'react-redux';

import StatisticsView from './StatisticsView';
import Menubar from '../dumb/Menubar';

import config from '../../config.js';

export default class MunkirjatApp extends React.Component {

    render() {
        return (
            <div id="page-inner">
                <Menubar />
                {this.props.children}

                <StatisticsView books={this.props.books} authors={this.props.authors} />

            </div>
        );
    }

    componentWillMount() {
        this.props.bookActions.fetchBooks();
        this.props.authorActions.fetchAuthors();
        this.props.genreActions.fetchGenres();
    }

    componenDidMount() {

        let self = this;
        $( document ).ajaxSend(function() {
            self.setupAjax();
        });
    }     
}
