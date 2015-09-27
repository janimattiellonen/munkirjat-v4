import React from 'react';
import Immutable from 'immutable';
import Translate from 'react-translate-component';
import _ from 'lodash';

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
			books = allBooks;
		}

		return (
			<div className="component">
					{this.props.children && React.cloneElement(
                    this.props.children,
                    {
                        authorActions: this.props.authorActions,
                        userActions: this.props.userActions,
                        bookActions: this.props.bookActions
                    }
                )}
				<h1>{this.getTitle()}</h1>
				<BooksList books={books} {...this.props} />
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
	},

	shouldComponentUpdate(nextProps, nextState) {
		if (this.props.params.mode != nextProps.params.mode) {
			this.props.fetchBooks(nextProps.params.mode);
		}

		return this.props.params.mode != nextProps.params.mode || this.state.mode == undefined;
	},
});
