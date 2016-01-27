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

	filterBooks(allBooks, mode, language, genre) {
		let books = null;

		if (null != genre && genre != 'all') {
			allBooks = allBooks.filter(book => book.genres.has(parseInt(genre)));
		}

		if (mode == 'unread') {
			books = allBooks.filter(b => b.is_read == 0);
		} else if (mode == 'read') {
			books = allBooks.filter(b => b.is_read == 1);
		} else {
			books = allBooks;
		}

		if (null != language && language != 'all') {
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
		const {language, genre} = this.props.params;

		let mode = this.getMode(this.props.params.mode);
		let books = this.filterBooks(this.props.books, mode, language, genre);

		return (
			<div className="component">

				<h1>{this.getTitle()}</h1>

				<div className={classNames("sort-box", {"hidden": this.state.search})}>
					<span>By language: </span>
					<ul className="horizontal-list">
						<li><a href={this.getUrl(mode, 'fi', genre)}>Finnish</a> | </li>
						<li><a href={this.getUrl(mode, 'se', genre)}>Swedish</a> | </li>
						<li><a href={this.getUrl(mode, 'en', genre)}>English</a> | </li>
						<li><a href={this.getUrl(mode, null, genre)}>All</a></li>
					</ul>
				</div>

				<div>
					{this.getSelectedGenre(genre)}
				</div>

				<div className="search-box">
					<input type="text" value={this.state.searchTerm} onChange={this.handleSearch}/>
				</div>	

				<BooksList {...this.props} books={books} />
			</div>
		);
	},

	getSelectedGenre(genre) {
		const {genres} = this.props;

		if (null != genres && null != genre && genre != 'all') {
			genre = parseInt(genre);
			if (genres.has(genre)) {
				return 'By genre: ' + genres.get(genre).name;
			}
		}
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

	getUrl(mode, language, genre) {
		return '/#/books/' + mode + (null != language ? '/' + language : '/all') + (null != genre ? '/' + genre : '	');
	}
});
