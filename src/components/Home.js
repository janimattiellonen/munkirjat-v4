import React from 'react';
import {List} from 'immutable';
import Api from '../api';
import Stats from "./Stats";
import StatsList from "./dumb/StatsList";
import {Link} from 'react-router';

export default React.createClass({

	getInitialState() {
		return {
			currentlyReadBooks: [],
			latestReadBooks: [],
			latestAddedBooks: [],
			favouriteAuthors: [],
			recentlyReadBooks: [],
			unreadBooks: []
		}
	},

	render() {
		const {authors, books} = this.props;

		return (
			<div className="stats-main">
				<div className="box h_taller">
					<h2>Currently reading</h2>

					<StatsList key={"currently-reading"} items={this.state.currentlyReadBooks} render={this.renderBookItem} />
				</div>

				<div className="box h_taller">
					<h2>Latest read book</h2>

					<StatsList key={"latest-read"} items={this.state.latestReadBooks} render={this.renderBookItem} />
				</div>

				<div className="box h_tallest">
					<h2>Latest added books</h2>

					<StatsList key={"latets-added"} items={this.state.latestAddedBooks} render={this.renderBookItem} />
				</div>

				<div className="box h_tallest">
					<h2>Favourite authors</h2>

					<StatsList key={"favourite-authors"} items={this.state.favouriteAuthors} render={this.renderAuthorItem} />
				</div>

				<div className="box h_tallest">
					<h2>Recently read books</h2>

					<StatsList key={"recently-read"} items={this.state.recentlyReadBooks} render={this.renderBookItem} />
				</div>

				<div className="box h_tallest">
					<h2>Unread books</h2>

					<StatsList key={"unread"} items={this.state.unreadBooks} render={this.renderBookItem} />
				</div>
			</div>
		);
	},

	componentWillReceiveProps(nextProps) {
		const {authors, books} = nextProps;

		let currentlyReadBook = Stats.getCurrentlyReadBook(books);
		let latestReadBook = Stats.getLatestReadBook(books);

		let currentlyReadBookArr = null !== currentlyReadBook ? [currentlyReadBook] : [];
		let latestReadBookArr = null !== latestReadBook ? [latestReadBook] : [];

		this.setState({
			currentlyReadBooks: currentlyReadBookArr,
			latestReadBooks: latestReadBookArr,
			latestAddedBooks: Stats.getLatestAddedBooks(books, 10),
			favouriteAuthors: Stats.getFavouriteAuthors(authors, 10),
			recentlyReadBooks: Stats.getRecentlyReadBooks(books, 10),
			unreadBooks: Stats.getUnreadBooks(books, 10)
		});
	},

	renderAuthorItem(item) {
		if (null === item) {
			return (
				<span>nothing</span>
			)
		}

		return (
			<Link to={'/author/' + item.id}>{item.name + ' (' + item.amount + ')'}</Link>
		)
	},

	renderBookItem(item) {
		if (null === item) {
			return (
				<span>nothing</span>
			)
		}

		return (
			<Link to={'/book/' + item.id}>{item.title}</Link>
		)
	},

	currentlyReading(book) {
		if (null === book) {
			return (
				<p>Nothing at the moment</p>
			)
		} 
	}
});
