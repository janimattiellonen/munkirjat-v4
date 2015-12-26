import React from 'react';
import Immutable from 'immutable';
import _ from 'lodash';
import history from '../history'
import BooksList from './BooksList';

export default React.createClass({

	getDefaultProps() {
		books: Immutable.List([])
	},

	getInitialState() {
		return {
			mode: undefined
		}
	},

	render() {

		let mode = this.props.params.mode;
		let books = null;
		let allBooks = this.props.books;

		if (mode == 'unread') {
			books = allBooks.filter(n => n.is_read == 0);
		} else if (mode == 'read') {
			books = allBooks.filter(n => n.is_read == 1);
		} else {
			mode = "all";
			books = allBooks;
		}

		let language = this.props.params.language;

		if (null != language) {
			books = books.filter(b => b.language_id == language);
		}

		return (
			<div className="component">
				

				<h1>{this.getTitle()}</h1>

				<span>By language: </span>
				<ul className="horizontal-list">
					<li><a href={"/#/books/" + mode + "/fi"}>Finnish</a> | </li>
					<li><a href={"/#/books/" + mode + "/se"}>Swedish</a> | </li>
					<li><a href={"/#/books/" + mode + "/en"}>English</a></li>
				</ul>
				<br/>	
				<br/>						
				<BooksList {...this.props} books={books} />
			</div>
		);
	},

	getTitle() {
		let title = null;

		switch(this.props.params.mode) {
			case 'read': {
				title = 'Read books';
				break;
			}
			case 'unread': {
				title = 'Unread books';
				break;
			}
			default: {
				title = 'Books';
			}
		}

		return title;
	}

	/*,

	shouldComponentUpdate(nextProps, nextState) {
		if (this.props.params.mode != nextProps.params.mode) {
			this.props.bookActions.fetchBooks(nextProps.params.mode);
		}

		return this.props.params.mode != nextProps.params.mode || this.state.mode == undefined;
	},
	*/
});
