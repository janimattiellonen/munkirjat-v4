import React from 'react';
import { Router, Route, IndexRoute } from 'react-router';

import MunkirjatAppContainer from './components/smart/MunkirjatAppContainer';
import About from './components/AboutView';
import HomeContainer from './components/smart/HomeContainer';
import NewAuthorViewContainer from './components/smart/NewAuthorViewContainer';
import UpdateAuthorViewContainer from './components/smart/UpdateAuthorViewContainer';
import AuthorViewContainer from './components/smart/AuthorViewContainer';
import AuthorsViewContainer from './components/smart/AuthorsViewContainer';
import BookViewContainer from './components/smart/BookViewContainer';
import BooksViewContainer from './components/smart/BooksViewContainer';
import NewBookViewContainer from './components/smart/NewBookViewContainer';
import UpdateBookViewContainer from './components/smart/UpdateBookViewContainer';
import LoginViewContainer from './components/smart/LoginViewContainer';
import GenresViewContainer from './components/smart/GenresViewContainer';
import CoversViewContainer from './components/smart/CoversViewContainer';
import UploadCoverViewContainer from './components/smart/UploadCoverViewContainer';

export function createRouter({ store, history }) {

    function checkFetcher(nextState, replaceState, callback) {

        if (!this.component.fetch) {
            callback();
            return;
        }
        this.component.fetch(store).then(callback);
    }

    function initApp(nextState, replaceState, callback) {
        /*
        // rewrite to load initial data for munkirjat
        store.dispatch(receiveTodos()).then(() => {
            callback();
        });
        */
    }

    return (
        <Router history={history}>
            <Route component={MunkirjatAppContainer} path="/">
                <IndexRoute component={HomeContainer}/>
                <Route path="about" component={About}/>
                <Route path="book/new" component={NewBookViewContainer} />
                <Route path="book/:id/edit" component={UpdateBookViewContainer} />
                <Route path="book/:id" component={BookViewContainer} />
                <Route path="books(/:mode)(/:language)(/:genre)" component={BooksViewContainer} />
                <Route path="authors" component={AuthorsViewContainer} />
                <Route path="author/new" component={NewAuthorViewContainer} />
                <Route path="author/:id/edit" component={UpdateAuthorViewContainer} />
                <Route path="author/:id" component={AuthorViewContainer} />
                <Route path="genres" component={GenresViewContainer} />
                <Route path="login" component={LoginViewContainer} />
                <Route path="covers" component={CoversViewContainer} />
                <Route path="cover/upload" component={UploadCoverViewContainer} />
                <Route path="access_token/:id" component={LoginViewContainer} />
            </Route>
        </Router>
    );
}

