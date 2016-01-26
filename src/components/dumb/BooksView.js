import React from 'react';
import _ from 'lodash';
import history from '../history'
import BooksList from './BooksList';
import SmartSearch from 'smart-search';
import classNames from 'classnames';
import {List, Map} from 'immutable';
import * as Utils from '../utils';


export default React.createClass({

	getDefaultProps() {
		books: List([])
	},

	getInitialState() {
		return {
			mode: undefined,
			searchTerm: '',
			search: false
		}
	},

	handleSearch(e) {
		let searchTerm = e.target.value;

		this.setState({
			search: searchTerm.length > 0,
			searchTerm: searchTerm.length > 0 ? searchTerm : ''
		});
	},

	filterBooks(mode, language) {
		let books = null;
		let allBooks = this.props.books;
		/*
		console.log("COUNT: " + allBooks.count());
		console.log("BOOKS: " + JSON.stringify(allBooks));

		//let ff = Map(allBooks);
		console.log("ii: " + JSON.stringify(allBooks.filter(book => book.genres.has(8))));
		*/
		if (mode == 'unread') {
			books = allBooks.filter(b => b.is_read == 0);
		} else if (mode == 'read') {
			books = allBooks.filter(b => b.is_read == 1);
		} else {
			books = allBooks;
		}

		if (null != language) {
			books = books.filter(b => b.language_id == language);
		}

		if (this.state.search) {
			books = Utils.filter(books, this.state.searchTerm, ['title']);
		} 	

		return books;
	},

	getMode(mode) {
		return mode != 'read' && mode != 'unread' ? 'all' : mode;
	},

	render() {
		let mode = this.getMode(this.props.params.mode);
		let books = this.filterBooks(mode, this.props.params.language);

		return (
			<div className="component">

				<h1>{this.getTitle()}</h1>

				<div className={classNames("sort-box", {"hidden": this.state.search})}>
					<span>By language: </span>
					<ul className="horizontal-list">
						<li><a href={'/#/books/' + mode + '/fi'}>Finnish</a> | </li>
						<li><a href={'/#/books/' + mode + '/se'}>Swedish</a> | </li>
						<li><a href={'/#/books/' + mode + '/en'}>English</a> | </li>
						<li><a href={'/#/books/' + mode}>All</a></li>
					</ul>
				</div>

				<div className="search-box">
					<input type="text" value={this.state.searchTerm} onChange={this.handleSearch}/>
				</div>	

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
});
