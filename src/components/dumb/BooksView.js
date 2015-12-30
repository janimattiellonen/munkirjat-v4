import React from 'react';
import Immutable from 'immutable';
import _ from 'lodash';
import history from '../history'
import BooksList from './BooksList';
import SmartSearch from 'smart-search';
import classNames from 'classnames';

export default React.createClass({

	getDefaultProps() {
		books: Immutable.List([])
	},

	getInitialState() {
		return {
			mode: undefined,
			searchTerm: "",
			search: false
		}
	},

	handleSearch(e) {
		let searchTerm = e.target.value;

		this.setState({
			search: searchTerm.length > 0,
			searchTerm: searchTerm.length > 0 ? searchTerm : ""
		});
	},

	filterBooks(books, searchTerm) {
		let patterns = [searchTerm];
		let fields = ['title'];
		let results = SmartSearch(books, patterns, fields);

		return Immutable.List(results).map(b => b.entry);
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

		if (this.state.search) {
			books = this.filterBooks(books, this.state.searchTerm);
		} 		

		return (
			<div className="component">

				<h1>{this.getTitle()}</h1>

				<div className={classNames("sort-box", {"hidden": this.state.search})}>
					<span>By language: </span>
					<ul className="horizontal-list">
						<li><a href={"/#/books/" + mode + "/fi"}>Finnish</a> | </li>
						<li><a href={"/#/books/" + mode + "/se"}>Swedish</a> | </li>
						<li><a href={"/#/books/" + mode + "/en"}>English</a> | </li>
						<li><a href={"/#/books/" + mode}>None</a></li>
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

	/*,

	shouldComponentUpdate(nextProps, nextState) {
		if (this.props.params.mode != nextProps.params.mode) {
			this.props.bookActions.fetchBooks(nextProps.params.mode);
		}

		return this.props.params.mode != nextProps.params.mode || this.state.mode == undefined;
	},
	*/
});
