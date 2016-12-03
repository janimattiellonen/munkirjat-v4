import React from 'react';
import Router, {RouteHandler} from 'react-router';
import { connect } from 'react-redux';

import StatisticsView from './StatisticsView';
import Menubar from '../dumb/Menubar';

export default class MunkirjatApp extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {
        const {authors, books} = this.props;
        console.log(JSON.stringify(location));
        return (
            <div id="page-inner" className={location.pathname.substring(1).replace('/', '-')}>
                <Menubar />
                {this.props.children}

                <StatisticsView books={books} authors={authors} />

            </div>
        );
    }

    componentWillMount() {
      console.log("MunkirjatApp::componentWillMount()");
        this.props.bookActions.fetchBooks();
        this.props.authorActions.fetchAuthors();
        this.props.genreActions.fetchGenres();
    }

    componentDidMount() {
        let self = this;
        $( document ).ajaxSend(function() {
            self.setupAjax();
        });
    }  
}
